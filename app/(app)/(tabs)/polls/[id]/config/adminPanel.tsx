import BackBtn from "@/components/btns/BackBtn";
import UserCard from "@/components/cards/UserCard";
import { AdminForm } from "@/components/forms/AdminForm";
import Void from "@/components/layout/Void";
import { Icon, SafeAreaView, Text, View } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { UserCircle } from "lucide-react-native";
import React from "react";

export default function AdminConfigScreen() {
	const primaryColor = useColor("primary");
	const { poll, setAdmin } = usePolls();

	if (!poll) return;
	const admins = poll.administration.admins || [];

	return (
		<SafeAreaView className="flex-1 p-3">
			<View className="py-2 mb-4 relative flex-row items-center justify-center gap-x-1">
				<BackBtn className="absolute top-0 left-0" />
				<Icon
					name={UserCircle}
					size={30}
					strokeWidth={2}
					color={primaryColor}
				/>
				<Text variant="title" className="text-primary ">
					Administrators
				</Text>
			</View>

			<View className="relative flex-1 gap-y-2">
				{admins.length > 0 ? (
					admins.map((a) => (
						<AdminForm.Trigger key={a.id}>
							<UserCard
								user={a.user as IUser}
								onTouchStart={() => setAdmin(a)}
							/>
						</AdminForm.Trigger>
					))
				) : (
					<Void msg="Poll has no admins. Click button bellow to add an admin👇" />
				)}

				<AdminForm.Trigger className="absolute bottom-0 right-0 w-full" />
			</View>
		</SafeAreaView>
	);
}
