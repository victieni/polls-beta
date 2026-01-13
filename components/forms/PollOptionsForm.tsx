import { View, Text, Input, Icon, Button } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { usePollOptionForm } from "@/hooks/formHooks";
import React, { Suspense, useState } from "react";
import OptionsFeed from "../Feeds/OptionsFeed";
import { Controller } from "react-hook-form";
import { Plus } from "lucide-react-native";
import { AvoidKeyboard } from "../ui/avoid-keyboard";
import { useMutation } from "@tanstack/react-query";
import { createPollOption } from "@/lib/functions/PollOption.functions";
import { PollOptionFormData } from "@/lib/schemas/pollOption.schema";

export default function PollOptionsForm() {
	const [thumbnail, setThumbnail] = useState<string>("");

	const { editPoll, newPoll } = usePolls();
	const poll = newPoll || editPoll;
	const { mutate: create, isPending: isCreating } =
		useMutation(createPollOption);

	const form = usePollOptionForm();

	// if (!editPoll && !newPoll) return;

	const submitHandler = (data: PollOptionFormData) => {
		console.log(data);

		const cleanData: IPollOptionCreate = {
			...data,
			poll: poll!.id,
			thumbnail,
		};

		// create(cleanData, {
		// 	onSuccess: (opt) => {
		// 		console.log("created Option:", opt);
		// 	},
		// });
	};

	return (
		<View className="gap-y-3">
			<Suspense fallback={<OptionsFeed.Fallback />}>
				<OptionsFeed poll={poll!} />
			</Suspense>
			<View className="gap-y-2">
				<Controller
					control={form.control}
					name="name"
					render={({ field }) => (
						<Input
							{...field}
							onChangeText={field.onChange}
							label="Name"
							error={form.formState.errors.name?.message}
						/>
					)}
				/>

				<Controller
					control={form.control}
					name="order"
					render={({ field }) => (
						<Input
							{...field}
							value={`${field.value}`}
							onChangeText={field.onChange}
							label={"Order"}
							keyboardType="number-pad"
							placeholder="Enter order eg: 1"
							error={form.formState.errors.order?.message}
						/>
					)}
				/>
				<Controller
					control={form.control}
					name="thumbnail"
					render={({ field }) => (
						<Input
							{...field}
							onChangeText={field.onChange}
							label="Description"
							type="textarea"
							placeholder="Enter extra details about this option..."
							error={form.formState.errors.description?.message}
						/>
					)}
				/>
			</View>

			<Button
				size="sm"
				disabled={isCreating}
				loading={isCreating}
				onPress={form.handleSubmit(submitHandler, (err) => console.log(err))}
			>
				<Text>Add</Text>
				<Icon name={Plus} />
			</Button>

			<AvoidKeyboard />
		</View>
	);
}
