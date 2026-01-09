import {
	Button,
	DatePicker,
	Icon,
	Input,
	Picker,
	Separator,
	Switch,
	Text,
	View,
} from "@/components/ui";
import { useColor } from "@/hooks/useColor";
import { PollFormData, PollSchema } from "@/lib/schemas/poll.schema";
import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	BookmarkCheck,
	BookType,
	FileQuestion,
	FileText,
	GitFork,
	Settings2,
} from "lucide-react-native";
import React, { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { AvoidKeyboard } from "../ui/avoid-keyboard";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createPoll } from "@/lib/functions/poll.functions";
export default function PollForm() {
	const [isPending, startTransition] = useTransition();
	const { mutate: create, isPending: isMutating } = useMutation(createPoll());

	const router = useRouter();
	const primaryColor = useColor("primary");

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(PollSchema),
		defaultValues: {
			title: "",
			prompt: "",
			description: "",
			startDate: new Date().toISOString(),
			// endDate: "",
			status: ePollStatus.DRAFT,
			tags: "",
			isEditable: true,
			isMultipleChoice: false,
			isPrivate: false,
			hideProgress: false,
			allowAnonymous: false,
			type: ePollType.SIMPLE,
		},
	});

	const submitHandler = (data: PollFormData) => {
		// console.log(data);

		const cleanData: IPollCreate = {
			...data,
			administration: {
				creator: "661a3b4c5e6f7a8b9c0d1e34",
			},
			tags: [],
		};

		startTransition(async () => {
			// Create
			create(
				{ ...cleanData },
				{
					onSuccess(data, variables, onMutateResult, context) {
						console.log("new Poll:", data);
						router.push("/(app)/(tabs)/create/createPollOption");
					},
					onError(error, variables, onMutateResult, context) {
						console.log(error);
					},
				}
			);
		});
	};

	return (
		<View className="flex-1 gap-y-4">
			<View className="flex-row items-center gap-x-1 justify-center">
				<Icon name={BookmarkCheck} size={27} color={primaryColor} />
				<Text variant="title" className="text-primary">
					PollForm
				</Text>
			</View>

			<View className="flex-1 gap-y-3">
				<Controller
					control={control}
					name="title"
					render={({ field }) => (
						<Input
							{...field}
							icon={BookType}
							onChangeText={field.onChange}
							label="Title"
							placeholder="Enter title..."
							error={errors.title?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="prompt"
					render={({ field }) => (
						<Input
							{...field}
							icon={FileQuestion}
							onChangeText={field.onChange}
							label="Prompt"
							type="textarea"
							placeholder="Enter the main question for your poll eg. 'Which of these is the best?'..."
							error={errors.prompt?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<Input
							{...field}
							icon={FileText}
							onChangeText={field.onChange}
							label="Description"
							type="textarea"
							placeholder="Enter description for your poll..."
							error={errors.description?.message}
						/>
					)}
				/>

				<View className="p-3 py-4 gap-y-2 h40 rounded-3xl bg-card">
					<View className="flex-row items-center gap-x-1">
						<Icon name={Settings2} size={24} />
						<Text className="font-medium ">Controls</Text>
					</View>

					<View>
						<Controller
							control={control}
							name="isPrivate"
							render={({ field }) => (
								<Switch
									{...field}
									label="Private"
									onValueChange={field.onChange}
									error={errors.isPrivate?.message}
								/>
							)}
						/>
						<Text className="text-xs text-muted-foreground">
							Only registered users can vote.
						</Text>
					</View>

					<Separator />

					<View>
						<Controller
							control={control}
							name="isEditable"
							render={({ field }) => (
								<Switch
									{...field}
									label="Editable"
									onValueChange={field.onChange}
									error={errors.isEditable?.message}
								/>
							)}
						/>
						<Text className="text-xs text-muted-foreground">
							Voters can change their choices
						</Text>
					</View>

					<Separator />
					<View>
						<Controller
							control={control}
							name="allowAnonymous"
							render={({ field }) => (
								<Switch
									{...field}
									label="Anonymous"
									onValueChange={field.onChange}
									error={errors.allowAnonymous?.message}
								/>
							)}
						/>
						<Text className="text-xs text-muted-foreground">
							Hide voter's identity.
						</Text>
					</View>
					<Separator />

					<View>
						<Controller
							control={control}
							name="hideProgress"
							render={({ field }) => (
								<Switch
									{...field}
									label="Hide Progress"
									onValueChange={field.onChange}
									error={errors.isEditable?.message}
								/>
							)}
						/>
						<Text className="text-xs text-muted-foreground">
							Hide poll's voting progress.
						</Text>
					</View>
					<Separator />

					<View>
						<Controller
							control={control}
							name="isMultipleChoice"
							render={({ field }) => (
								<Switch
									{...field}
									label="Multiple choice"
									onValueChange={field.onChange}
									error={errors.isMultipleChoice?.message}
								/>
							)}
						/>
						<Text className="text-xs text-muted-foreground">
							Voters can submit more than one choice
						</Text>
					</View>
				</View>

				<Controller
					control={control}
					name="type"
					render={({ field }) => (
						<Picker
							{...field}
							options={Object.entries(ePollType).map(([label, value]) => ({
								label,
								value,
							}))}
							placeholder="Select Poll type"
							label="Poll type"
							icon={GitFork}
							error={errors.type?.message}
							modalTitle="Poll Types"
							onValueChange={field.onChange}
						/>
					)}
				/>

				{/* Date Fields */}
				<Controller
					control={control}
					name="startDate"
					render={({ field }) => (
						<DatePicker
							{...field}
							value={new Date(field.value!)}
							mode="datetime"
							label="Start date"
							placeholder="Select starting date..."
							error={errors.startDate?.message}
							minimumDate={new Date()}
						/>
					)}
				/>
				<Controller
					control={control}
					name="endDate"
					render={({ field }) => (
						<DatePicker
							{...field}
							value={new Date(field.value!)}
							mode="datetime"
							label="End date"
							placeholder="Select starting date..."
							error={errors.endDate?.message}
							minimumDate={new Date()}
						/>
					)}
				/>
			</View>

			<Button
				size="lg"
				disabled={isPending || isMutating}
				loading={isPending || isMutating}
				onPress={handleSubmit(submitHandler, (err) => console.log(err))}
				className="w-full"
			>
				Create
			</Button>
			<AvoidKeyboard />
		</View>
	);
}
