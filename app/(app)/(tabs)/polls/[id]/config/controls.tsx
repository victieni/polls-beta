import BackBtn from "@/components/btns/BackBtn";
import {
	Card,
	CardContent,
	Icon,
	SafeAreaView,
	ScrollView,
	Separator,
	Switch,
	Text,
	View,
} from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { updatePoll } from "@/lib/functions/poll.functions";
import {
	PollControlsFormData,
	usePollControlsForm,
} from "@/lib/schemas/poll.schema";
import { useMutation } from "@tanstack/react-query";
import {
	ChartBarIcon,
	CheckCheck,
	Edit3,
	EyeOff,
	HandCoinsIcon,
	LucideProps,
	MessageSquareText,
	Settings2,
	ShieldUser,
	StopCircle,
	UserX,
} from "lucide-react-native";
import React, { ComponentType } from "react";
import { Controller, FieldPath } from "react-hook-form";

export default function ControlScreen() {
	const poll = usePolls().poll!;
	const primaryColor = useColor("primary");
	const form = usePollControlsForm(poll.controls);

	return (
		<SafeAreaView className="flex-1 p-3">
			<View className="py-2 mb-4 relative flex-row items-center justify-center gap-x-1">
				<BackBtn className="absolute top-0 left-0" />
				<Icon name={Settings2} size={30} strokeWidth={2} color={primaryColor} />
				<Text variant="title" className="text-primary ">
					Controls
				</Text>
			</View>

			<ScrollView collapsable contentContainerClassName="flex-2 gap-y-3">
				<View className="gap-y-2">
					<Text variant={"subtitle"}>Privacy & Access Control</Text>
					<Card>
						<CardContent>
							<ControlSwitch
								label="Private"
								description="Only visible to followers"
								name="isPrivate"
								icon={EyeOff}
								form={form}
							/>
							<ControlSwitch
								label="Anonymous"
								description="Voters can hide their identity"
								name="allowAnonymous"
								icon={UserX}
								form={form}
							/>
							<ControlSwitch
								label="Registration"
								description="Users must register to vote."
								name="registrationIsRequired"
								icon={ShieldUser}
								form={form}
								hideSeparator
							/>
						</CardContent>
					</Card>
				</View>

				<View className="gap-y-2">
					<Text variant={"subtitle"}>Voting & Response Behavior</Text>

					<Card>
						<CardContent>
							<ControlSwitch
								label="Multiple choice"
								description="Users can make more than one choice"
								name="isMultipleChoice"
								icon={CheckCheck}
								form={form}
							/>
							<ControlSwitch
								label="Custom response"
								description="Allow typed opinions from users."
								name="allowCustomResponse"
								icon={MessageSquareText}
								form={form}
							/>
							<ControlSwitch
								label="Limit votes number"
								description="Set maximum number of votes"
								name="votesNumberIsLimited"
								icon={StopCircle}
								form={form}
								hideSeparator
							/>
						</CardContent>
					</Card>
				</View>

				<View className="gap-y-2">
					<Text variant="subtitle">Editability & Visibility</Text>

					<Card>
						<CardContent>
							<ControlSwitch
								label="Editable"
								icon={Edit3}
								description="Users can change their choice"
								name="isEditable"
								form={form}
							/>
							<ControlSwitch
								label="Hide Progress"
								description="Hide live progress of the poll "
								name="progressIsHidden"
								icon={ChartBarIcon}
								form={form}
							/>
							<ControlSwitch
								label="Candidate autonomy"
								description="Candidates can customize their option"
								name="candidateIsAllowedToEditOption"
								icon={HandCoinsIcon}
								form={form}
								hideSeparator
							/>
						</CardContent>
					</Card>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const ControlSwitch = ({
	label,
	description,
	name,
	hideSeparator = false,
	icon,
	form,
}: {
	label: string;
	description: string;
	name: FieldPath<PollControlsFormData>;
	hideSeparator?: boolean;
	icon: ComponentType<LucideProps>;
	form: ReturnType<typeof usePollControlsForm>;
}) => {
	const poll = usePolls().poll!;

	const { mutate: update, isPending } = useMutation(updatePoll);

	const switchHandler = (data: PollControlsFormData) => {
		const cleanData: IPoll = {
			...poll,
			// controls: data,
			controls: { ...form.watch(), maxVotes: undefined },
		};
		
		update(cleanData);
	};

	return (
		<View className="flex-row items-start gap-x-3">
			<Icon name={icon} />
			<View className="flex-1">
				<Controller
					control={form.control}
					name={name}
					render={({ field }) => (
						<Switch
							{...field}
							value={field.value as boolean} // ! Monitor *(risky)
							onValueChange={
								(v) => field.onChange(v) // ! Monitor *(risky)
							}
							onChange={form.handleSubmit(switchHandler, (err) =>
								console.log(err)
							)}
							label={label}
							disabled={isPending}
							className="pb-0!"
						/>
					)}
				/>

				<Text variant="caption" className="">
					{description}
				</Text>

				{hideSeparator || <Separator className="my-2" />}
			</View>
		</View>
	);
};
