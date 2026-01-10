import {
	BottomSheet,
	Button,
	DatePicker,
	Icon,
	Input,
	Picker,
	ScrollView,
	Separator,
	Switch,
	Text,
	useBottomSheet,
	View,
} from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { usePollForm } from "@/hooks/formHooks";
import { useColor } from "@/hooks/useColor";
import { createPoll, updatePoll } from "@/lib/functions/poll.functions";
import { PollFormData } from "@/lib/schemas/poll.schema";
import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
	BookmarkCheck,
	BookType,
	FileQuestion,
	FileText,
	GitFork,
	Settings2,
} from "lucide-react-native";
import React, { useTransition } from "react";
import { Controller } from "react-hook-form";
import { AvoidKeyboard } from "../ui/avoid-keyboard";
import PollOptionsForm from "./PollOptionsForm";

export default function PollForm() {
	const {
		newPoll,
		setNewPoll,
		pollOptions,
		reset: resetPollsContext,
	} = usePolls();

	const { mutate: create, isPending: isCreating } = useMutation(createPoll());
	const { mutate: update, isPending: isUpdating } = useMutation(updatePoll());
	const [isPending, startTransition] = useTransition();

	const { isVisible, close, open: openOptionsSheet } = useBottomSheet();

	const router = useRouter();
	const primaryColor = useColor("primary");

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset: resetForm,
	} = usePollForm();

	const submitHandler = (data: PollFormData) => {
		const cleanData: IPollCreate = {
			...data,
			administration: {
				creator: "661a3b4c5e6f7a8b9c0d1e33",
			},
			tags: [],
		};

		startTransition(async () => {
			// Create
			create(
				{ ...cleanData },
				{
					onSuccess(data, variables, onMutateResult, context) {
						setNewPoll(data);
						openOptionsSheet();
						// router.push(`/create/${data.id}`)
						// router.push({ pathname: "/create/[id]", params: { id: data.id } });
					},
					onError(error) {
						console.log(error);
					},
				}
			);
		});
	};

	const publishHandler = () => {
		if (!newPoll) return;
		update(
			{ ...newPoll, status: ePollStatus.OPEN },
			{
				onSuccess: ({ id }) => {
					console.log("Published");
					resetForm();
					resetPollsContext();
					// ! redirect to Poll screen
					router.replace({ pathname: "/poll/[id]", params: { id } });
				},
			}
		);
	};

	return (
		<>
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
								placeholder="Enter the main question for your newPoll eg. 'Which of these is the best?'..."
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

				{newPoll ? (
					<View className="flex-row items-center gap-x-2">
						<Button
							onPress={openOptionsSheet}
							variant="outline"
							className="flex-1"
						>
							Options
						</Button>
						<Button
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
			<PollForm.OptionsBottomSheet close={close} isVisible={isVisible} />
		</>
	);
}

PollForm.OptionsBottomSheet = ({
	close,
	isVisible,
}: {
	close: () => void;
	isVisible: boolean;
}) => {
	return (
		<BottomSheet
			isVisible={isVisible}
			onClose={close}
			title="Add Options"
			snapPoints={[0.5, 0.9]}
		>
			<ScrollView>
				<PollOptionsForm />
			</ScrollView>
		</BottomSheet>
	);
};
