import { SignOutButton } from "@/components/btns/signoutBtn";
import UsersFeed from "@/components/Feeds/UsersFeed";
import { Button, Icon, Link, SafeAreaView, Text, View } from "@/components/ui";
import { useColor } from "@/hooks/useColor";
import { Settings, UserCircle, UsersIcon } from "lucide-react-native";
import React, { Suspense } from "react";

export default function ProfileScreen() {
	const primary = useColor("primary");

	return (
		<SafeAreaView className="flex-1 p-3">
			<View className="flex-row gap-x-2 items-center justify-between">
				<View className="flex-row items-center gap-x-1">
					<Icon name={UserCircle} size={30} color={primary} />
					<Text variant="heading" className="text-primary">
						Profile
					</Text>
				</View>
			</View>

			{/* <Link href="/sheet" asChild> */}
			<Link href="/profile/settings" asChild>
				<Button icon={Settings} size="icon" variant="outline" />
			</Link>

			<SignOutButton />

			<Text>Users page experimental</Text>
			<Text>{process.env.EXPO_PUBLIC_API}</Text>

			<Suspense fallback={<UsersFeed.Fallback />}>
				<UsersFeed />
			</Suspense>
		</SafeAreaView>
	);
}
