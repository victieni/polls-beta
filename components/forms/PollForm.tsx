import {
	Button,
	DatePicker,
	Icon,
	Input,
	Link,
	Picker,
	Separator,
	Switch,
	Text,
	View
} from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { usePollForm } from "@/hooks/formHooks";
import { useColor } from "@/hooks/useColor";
import {
	createPoll,
	getPoll,
	updatePoll,
} from "@/lib/functions/poll.functions";
import { PollFormData } from "@/lib/schemas/poll.schema";
import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
	BookmarkCheck,
	BookType,
	FileQuestion,
	FileText,
	GitFork,
	Option,
	Settings2,
	Share,
} from "lucide-react-native";
import React, { useEffect, useTransition } from "react";
import { Controller } from "react-hook-form";
import { AvoidKeyboard } from "../ui/avoid-keyboard";

export default function PollForm() {
	const { poll, setPoll, pollOptions, reset: resetPollsContext } = usePolls();

	// ! demo only
	const { data } = useQuery(getPoll("69625140cfbbf666ccd94d2d"));
	useEffect(() => {
		setPoll(data);
	}, [data]);

	const { mutate: create, isPending: isCreating } = useMutation(createPoll());
	const { mutate: update, isPending: isUpdating } = useMutation(updatePoll());
	const [isPending, startTransition] = useTransition();

	const router = useRouter();
	const primaryColor = useColor("primary");

	const { handleSubmit, control, reset: resetForm } = usePollForm({ poll });

	const submitHandler = (data: PollFormData) => {
		const cleanData: IPollCreate = {
			...data,
			administration: {
				creator: "661a3b4c5e6f7a8b9c0d1e33",
			},
			tags: [],
		};

		startTransition(async () => {
			create(cleanData, {
				onSuccess(data) {
					setPoll(data);
					// openOptionsSheet();
					router.push({ pathname: "/create/[id]", params: { id: data.id } });
				},
				onError(error) {
					console.log(error);
				},
			});
		});
	};

	const publishHandler = () => {
		if (!poll) return;
		update(
			{ ...poll, status: ePollStatus.OPEN },
			{
				onSuccess: ({ id }) => {
					console.log("Published");
					resetForm();
					resetPollsContext();
					router.replace({ pathname: "/poll/[id]", params: { id } });
				},
			}
		);
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
					render={({ field, fieldState: { error } }) => (
						<Input
							{...field}
							icon={BookType}
							onChangeText={field.onChange}
							label="Title"
							placeholder="Enter title..."
							error={error?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="prompt"
					render={({ field, fieldState: { error } }) => (
						<Input
							{...field}
							icon={FileQuestion}
							onChangeText={field.onChange}
							label="Prompt"
							type="textarea"
							placeholder="Enter the main question for your poll eg. 'Which of these is the best?'..."
							error={error?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="description"
					render={({ field, fieldState: { error } }) => (
						<Input
							{...field}
							icon={FileText}
							onChangeText={field.onChange}
							label="Description"
							type="textarea"
							placeholder="Enter description for your poll..."
							error={error?.message}
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
							name="controls.isPrivate"
							render={({ field, fieldState: { error } }) => (
								<Switch
									{...field}
									label="Private"
									onValueChange={field.onChange}
									error={error?.message}
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
							name="controls.isEditable"
							render={({ field, fieldState: { error } }) => (
								<Switch
									{...field}
									label="Editable"
									onValueChange={field.onChange}
									error={error?.message}
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
							name="controls.allowAnonymous"
							render={({ field, fieldState: { error } }) => (
								<Switch
									{...field}
									label="Anonymous"
									onValueChange={field.onChange}
									error={error?.message}
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
							name="controls.progressIsHidden"
							render={({ field, fieldState: { error } }) => (
								<Switch
									{...field}
									label="Hide Progress"
									onValueChange={field.onChange}
									error={error?.message}
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
							name="controls.isMultipleChoice"
							render={({ field, fieldState: { error } }) => (
								<Switch
									{...field}
									label="Multiple choice"
									onValueChange={field.onChange}
									error={error?.message}
								/>
							)}
						/>
						<Text className="text-xs text-muted-foreground">
							Voters can submit more than one choice
						</Text>
					</View>

					<Separator />

					<View>
						<Controller
							control={control}
							name="controls.allowCustomResponse"
							render={({ field, fieldState: { error } }) => (
								<Switch
									{...field}
									label="Custom response"
									onValueChange={field.onChange}
									error={error?.message}
								/>
							)}
						/>
						<Text className="text-xs text-muted-foreground">
							Voters can give custom response outside provided options
						</Text>
					</View>
				</View>

				<Controller
					control={control}
					name="type"
					render={({ field, fieldState: { error } }) => (
						<Picker
							{...field}
							options={Object.entries(ePollType).map(([label, value]) => ({
								label,
								value,
							}))}
							placeholder="Select Poll type"
							label="Poll type"
							icon={GitFork}
							error={error?.message}
							modalTitle="Poll Types"
							onValueChange={field.onChange}
						/>
					)}
				/>

				{/* Date Fields */}
				<Controller
					control={control}
					name="startDate"
					render={({ field, fieldState: { error } }) => (
						<DatePicker
							{...field}
							value={new Date(field.value!)}
							mode="datetime"
							label="Start date"
							placeholder="Select starting date..."
							error={error?.message}
							minimumDate={new Date()}
						/>
					)}
				/>
				<Controller
					control={control}
					name="endDate"
					render={({ field, fieldState: { error } }) => (
						<DatePicker
							{...field}
							value={new Date(field.value!)}
							mode="datetime"
							label="End date"
							placeholder="Select starting date..."
							error={error?.message}
							minimumDate={new Date()}
						/>
					)}
				/>
			</View>

			{poll ? (
				<View className="flex-row items-center gap-x-2">
					<Link
						asChild
						href={{ pathname: "/create/[id]", params: { id: poll.id } }}
					>
						<Button icon={Option} variant="outline" className="flex-1">
							Options
						</Button>
					</Link>
					<Button
						icon={Share}
						loading={isUpdating}
						disabled={isUpdating || pollOptions.length < 1}
						onPress={publishHandler}
						className="flex-1"
					>
						Publish
					</Button>
				</View>
			) : (
				<Button
					size="lg"
					disabled={isPending || isCreating}
					loading={isPending || isCreating}
					onPress={handleSubmit(submitHandler, (err) => console.log(err))}
					className="w-full"
				>
					Create
				</Button>
			)}
			<AvoidKeyboard />
		</View>
	);
}
