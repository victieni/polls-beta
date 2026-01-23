import BackBtn from "@/components/btns/BackBtn";
import { PollForm } from "@/components/forms/PollForm";
import {
	AlertDialog,
	Button,
	Card,
	CardContent,
	Icon,
	Link,
	SafeAreaView,
	Text,
	useAlertDialog,
	View,
} from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { usePollAdmin } from "@/hooks/util.hooks";
import { deletePoll } from "@/lib/functions/poll.functions";
import { useMutation } from "@tanstack/react-query";
import { Router, useRouter } from "expo-router";
import {
	ChevronRight,
	LucideProps,
	Option,
	ReceiptPoundSterling,
	Settings,
	Settings2,
	ShieldUser,
	Trash2,
	UserCircle,
} from "lucide-react-native";
import React, { ComponentType } from "react";

export default function ConfigScreen() {
	const primaryColor = useColor("primary");
	const { poll } = usePolls();
	const { isAdmin, isCreator, admin } = usePollAdmin(poll!);
	const { close, isVisible, open } = useAlertDialog();
	const { mutate: _delete, isPending: isDeleting } = useMutation(deletePoll);
	const router = useRouter();

	if (!poll) return;

	const deleteHandler = () => {
		_delete(poll.id, {
			onSuccess: () => {
				close();
				router.push("/polls");
			},
		});
	};

	return (
		<SafeAreaView className="flex-1 relative p-3">
			<View className="py-2 mb-4 relative flex-row items-center justify-center gap-x-1">
				<BackBtn className="absolute top-0 left-0" />
				<Icon name={Settings} size={30} strokeWidth={2} color={primaryColor} />
				<Text variant="title" className="text-primary ">
					Poll Settings
				</Text>
			</View>

			<View className="gap-y-3">
				<LinkCard
					title={"Administration"}
					iconName={UserCircle}
					description="Manage the poll administrators"
					href={{
						pathname: "/polls/[id]/config/adminPanel",
						params: { id: poll.id },
					}}
				/>
				<LinkCard
					title={"Controls"}
					iconName={Settings2}
					description="Regulate primary functions of your poll"
					href={{
						pathname: "/polls/[id]/config/controls",
						params: { id: poll.id },
					}}
				/>

				<LinkCard
					title={"Options"}
					iconName={Option}
					description="Edit the poll options / choices"
					href={{
						pathname: "/polls/[id]/config/options",
						params: { id: poll.id },
					}}
				/>

				{poll.controls?.registrationIsRequired && (
					<LinkCard
						title={"Registration"}
						iconName={ShieldUser}
						description="Config registration rules for poll"
						href={{
							pathname: "/polls/[id]/config/registration",
							params: { id: poll.id },
						}}
					/>
				)}
			</View>

			<View className="absolute bottom-7 right-0 w-full gap-y-2">
				<PollForm.Trigger />

				<Button
					icon={Trash2}
					disabled={isDeleting}
					loading={isDeleting}
					variant="destructive"
					onPress={open}
				>
					<Text className="text-white">Delete poll</Text>
				</Button>
				<AlertDialog
					isVisible={isVisible}
					onClose={close}
					confirmText="Delete"
					cancelText="Cancel"
					dismissible
					title="Delete Poll"
					description={`Are you sure sure you want to delete Poll: ${poll.title}?`}
					onConfirm={deleteHandler}
					onCancel={close}
				/>
			</View>
			{/* Results configs */}

			{/* Config Recommendations */}
			{/* 1. Private Polls to set up registration */}
			{/* 2. Limited votes number to set up Max votes */}
			{/* 3. AI */}
		</SafeAreaView>
	);
}

const LinkCard = ({
	href,
	title,
	description,
	iconName,
}: {
	href: Parameters<Router["push"]>["0"];
	title: string;
	description: string;
	iconName: ComponentType<LucideProps>;
}) => {
	const primaryColor = useColor("primary");
	const mutedColor = useColor("mutedForeground");
	const router = useRouter();

	return (
		<Card onTouchStart={() => router.push(href)}>
			<CardContent className="flex-row items-start gap-x-3">
				<Icon name={iconName} size={30} color={primaryColor} />

				<View className="flex-1">
					<View className="flex-row items-center justify-between">
						<Text variant="title" className="textprimary">
							{title}
						</Text>
						<Icon name={ChevronRight} color={mutedColor} />
					</View>
					<Text variant="caption">{description}</Text>
				</View>
			</CardContent>
		</Card>
	);
};
