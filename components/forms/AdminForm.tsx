import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { updatePoll } from "@/lib/functions/poll.functions";
import {
	adminPermissionsFormData,
	useAdminPermissionsForm,
} from "@/lib/schemas/admin.schema";
import { useMutation } from "@tanstack/react-query";
import {
	Box,
	LucideProps,
	Option,
	Settings2,
	ShieldCheck,
	ShieldUser,
	UserPlus,
	UserX,
} from "lucide-react-native";
import React, { ComponentProps, ComponentType, useState } from "react";
import { Controller, FieldPath } from "react-hook-form";
import {
	BottomSheet,
	Button,
	Card,
	CardContent,
	Icon,
	OptionType,
	Separator,
	Switch,
	Text,
	useBottomSheet,
	View,
} from "../ui";
import UsersCombobox from "../UsersCombobox";

const Main = ({ successAction }: { successAction: () => void }) => {
	const { admin, poll } = usePolls();
	const [selectedAdmin, setSelectedAdmin] = useState<OptionType | null>(
		admin
			? {
					value: admin.user.id,
					label: `@${admin.user.fname} ${admin.user.lname}`,
			  }
			: null
	);

	console.log("admin Permissions", admin?.permissions);
	const form = useAdminPermissionsForm(admin?.permissions);
	const { mutate: update, isPending } = useMutation(updatePoll);

	const destructiveColor = useColor("destructive");

	if (!poll) return;

	const adminArr: IPollAdmin[] =
		poll.administration.admins?.map((a) => ({
			...a,
			user: a.user.id,
		})) || [];

	const addAdminHandler = () => {
		if (!selectedAdmin) return;

		update(
			{
				...poll,
				administration: {
					...poll.administration,
					admins: [
						...adminArr,
						{
							user: selectedAdmin?.value,
							permissions: form.watch(),
						},
					],
				},
			},
			{
				onSuccess() {
					successAction();
				},
			}
		);
	};

	const removeAdminHandler = () => {
		if (!admin) return;

		update(
			{
				...poll,
				administration: {
					...poll.administration,
					admins: adminArr.filter((a) => a.user !== admin.user.id),
				},
			},
			{
				onSuccess() {
					successAction();
				},
			}
		);
	};

	return (
		<View className="gap-y-4">
			<UsersCombobox
				defaultValue={selectedAdmin}
				selectAction={setSelectedAdmin}
			/>

			<View className="gap-y-3">
				<Text variant="subtitle">Admin Permissions</Text>

				<Card>
					<CardContent>
						<ControlSwitch
							name="updatePolls"
							label="Edit poll"
							description="Admin can update the poll details."
							form={form}
							icon={Box}
						/>
						<ControlSwitch
							name="updateControls"
							label="Edit controls"
							description="Admin can update the poll controls."
							form={form}
							icon={Settings2}
						/>
						<ControlSwitch
							name="updateOptions"
							label="Edit options"
							description="Admin can update the poll options."
							form={form}
							icon={Option}
						/>
						<ControlSwitch
							name="updateRegistration"
							label="Edit registration config"
							description="Admin can modify poll registration ."
							form={form}
							icon={ShieldUser}
						/>
						<ControlSwitch
							name="verifyVoters"
							label="Verify voters"
							description="Admin can verify registered voters."
							form={form}
							icon={ShieldCheck}
							hideSeparator
						/>
					</CardContent>
				</Card>

				{admin ? (
					<Button
						variant="secondary"
						disabled={isPending || !selectedAdmin}
						loading={isPending}
						onPress={removeAdminHandler}
					>
						<Icon name={UserX} color={destructiveColor} />
						<Text className="text-destructive">Remove admin</Text>
					</Button>
				) : (
					<Button
						icon={UserPlus}
						disabled={isPending || !selectedAdmin}
						loading={isPending}
						onPress={addAdminHandler}
					>
						Add admin
					</Button>
				)}
			</View>
		</View>
	);
};

const Trigger = ({
	className,
	children,
	...props
}: ComponentProps<typeof Button>) => {
	const { close, open, isVisible } = useBottomSheet();
	const { admin, setAdmin } = usePolls();

	const closeHandler = () => {
		setAdmin(undefined);
		close();
	};

	return (
		<>
			{children ? (
				<View onTouchStart={open}>{children}</View>
			) : (
				<Button
					{...props}
					icon={UserPlus}
					onPress={open}
					className={`${className} `}
				>
					Add admin
				</Button>
			)}
			<BottomSheet
				title={admin ? "Modify permission" : "Add admin"}
				isVisible={isVisible}
				onClose={closeHandler}
				snapPoints={[0.8, 0.9]}
			>
				<Main successAction={closeHandler} />
			</BottomSheet>
		</>
	);
};

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
	name: FieldPath<adminPermissionsFormData>;
	hideSeparator?: boolean;
	icon: ComponentType<LucideProps>;
	form: ReturnType<typeof useAdminPermissionsForm>;
}) => {
	const { poll, admin } = usePolls();
	const primaryColor = useColor("primary");

	const { mutate: update, isPending } = useMutation(updatePoll);

	if (!poll) return;

	const adminArr: IPollAdmin[] =
		poll.administration.admins?.map((a) => ({
			...a,
			user: a.user.id,
		})) || [];

	const switchHandler = (data: adminPermissionsFormData) => {
		if (!admin) return;

		const admins = adminArr.filter((a) => a.user !== admin.user.id);

		const cleanData: IPoll = {
			...poll,
			administration: {
				...poll.administration,
				admins: [
					...admins,
					{
						...admin,
						permissions: form.watch(),
					},
				],
			},
		};

		update(cleanData);
	};

	return (
		<View className="flex-row items-start gap-x-3">
			<Icon name={icon} color={primaryColor} />
			<View className="flex-1">
				<Controller
					control={form.control}
					name={name}
					render={({ field }) => (
						<Switch
							{...field}
							value={field.value as boolean}
							onValueChange={(v) => field.onChange(v)}
							onChange={form.handleSubmit(switchHandler)}
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

export const AdminForm = { Main, Trigger };
