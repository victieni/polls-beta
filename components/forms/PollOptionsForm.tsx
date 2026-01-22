import {
	BottomSheet,
	Button,
	Icon,
	Input,
	OptionType,
	ScrollView,
	useBottomSheet,
	View,
} from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { usePollOptionForm } from "@/hooks/formHooks";
import { useColor } from "@/hooks/useColor";
import {
	createPollOption,
	deletePollOption,
	updatePollOption,
} from "@/lib/functions/PollOption.functions";
import { PollOptionFormData } from "@/lib/schemas/pollOption.schema";
import { ePollType } from "@/polls-backend/typescript/enum";
import { useMutation } from "@tanstack/react-query";
import { Edit3, Image, Plus, Trash2 } from "lucide-react-native";
import React, { ComponentProps, ReactNode, useState } from "react";
import { Controller } from "react-hook-form";
import { MediaAsset, MediaPicker } from "../ui/media-picker";
import UsersCombobox from "../UsersCombobox";

const Main = ({ successAction }: { successAction?: () => void }) => {
	const { poll, pollOption, setPollOption } = usePolls();
	const [selectedAsset, setSelectedAsset] = useState<MediaAsset[]>([]);
	const [selectedCandidate, setSelectedCandidate] = useState<OptionType | null>(
		pollOption?.candidate
			? {
					value: pollOption.candidate.id,
					label: `@${pollOption.candidate.fname} ${pollOption.candidate.lname}`,
			  }
			: null
	);

	// const [candidate, setCandidate] = useState<string>(
	// 	pollOption?.candidate?.id || ""
	// );
	const [thumbnail, setThumbnail] = useState<string>(
		pollOption?.thumbnail ?? ""
	);

	const destructiveColor = useColor("destructive");

	const { mutate: create, isPending: isCreating } =
		useMutation(createPollOption);
	const { mutate: update, isPending: isUpdating } =
		useMutation(updatePollOption);
	const { mutate: deleteOption, isPending: isDeleting } =
		useMutation(deletePollOption);

	const form = usePollOptionForm(pollOption);

	if (!poll) return;

	// if (!editPoll && !newPoll) return;

	const submitHandler = (data: PollOptionFormData) => {
		console.log(data);

		const cleanData: IPollOptionCreate = {
			...data,
			poll: poll.id,
			thumbnail,
			candidate: selectedCandidate?.value ?? "",
		};

		if (pollOption) {
			update(
				{ ...pollOption, ...cleanData },
				{
					onSuccess: (opt) => {
						if (successAction) successAction();
						console.log("Updated Option:", opt);
					},
				}
			);
		} else {
			create(cleanData, {
				onSuccess: (opt) => {
					if (successAction) successAction();

					console.log("created Option:", opt);
				},
			});
		}
	};

	const deleteHandler = (id: IPollOption["id"]) =>
		deleteOption(id, {
			onSuccess: (opt) => {
				if (successAction) successAction();
				setPollOption(undefined);
				console.log("deleted Option:", opt);
			},
		});

	return (
		<ScrollView>
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
					name="description"
					render={({ field }) => (
						<Input
							{...field}
							onChangeText={field.onChange}
							label="Description (opt)"
							type="textarea"
							placeholder="Enter extra details about this option..."
							error={form.formState.errors.description?.message}
						/>
					)}
				/>

				{/* Image picker */}
				{poll.type === ePollType.ELECTION ? (
					<UsersCombobox
						selectAction={setSelectedCandidate}
						defaultValue={selectedCandidate}
					/>
				) : (
					<MediaPicker
						mediaType="image"
						buttonText="Select thumbnail"
						multiple={false}
						maxSelection={1}
						icon={Image}
						variant="secondary"
						// onError={}
						selectedAssets={selectedAsset}
						onSelectionChange={setSelectedAsset}
					/>
				)}
			</View>

			{pollOption ? (
				<View className="flex-row items-center gap-x-3">
					<Button
						size="icon"
						variant="secondary"
						// icon={Trash2}
						disabled={isDeleting}
						loading={isDeleting}
						onPress={() => deleteHandler(pollOption.id)}
						className="mt-3 text-destructive"
					>
						<Icon name={Trash2} color={destructiveColor} />
					</Button>

					<Button
						size="sm"
						icon={Edit3}
						disabled={isUpdating}
						loading={isUpdating}
						onPress={form.handleSubmit(submitHandler, (err) =>
							console.log(err)
						)}
						className="mt-3 flex-1"
					>
						Edit
					</Button>
				</View>
			) : (
				<Button
					size="sm"
					icon={Plus}
					disabled={isCreating}
					loading={isCreating}
					onPress={form.handleSubmit(submitHandler, (err) => console.log(err))}
					className="mt-3"
				>
					Add
				</Button>
			)}
		</ScrollView>
	);
};

const SheetTrigger = ({
	className,
	children,
	touchAction,
	...props
}: { touchAction?: () => void; children?: ReactNode } & ComponentProps<
	typeof Main
> &
	ComponentProps<typeof Button>) => {
	const { isVisible, close, open } = useBottomSheet();
	const { setPollOption, poll } = usePolls();

	if (!poll) return;

	const touchHandler = () => {
		if (touchAction) touchAction();
		open();
	};

	const closeHandler = () => {
		setPollOption(undefined);
		close();
	};

	return (
		<>
			{children ? (
				<View onTouchStart={touchHandler}>{children}</View>
			) : (
				<Button
					{...props}
					icon={Plus}
					onPress={open}
					className={`${className}`}
				>
					Add Option
				</Button>
			)}
			<BottomSheet
				isVisible={isVisible}
				onClose={closeHandler}
				title="Add Option"
				// snapPoints={[0.6, 0.95]}
				snapPoints={poll.type === ePollType.ELECTION ? [0.6, 0.8] : [0.6, 0.95]}
			>
				<Main successAction={closeHandler} />
			</BottomSheet>
		</>
	);
};

export const PollOptionsForm = { Main, SheetTrigger };
