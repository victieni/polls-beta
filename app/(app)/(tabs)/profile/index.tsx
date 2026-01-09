import UsersFeed from "@/components/Feeds/UsersFeed";
import { Icon, SafeAreaView, Text, View } from "@/components/ui";
import { UsersIcon } from "lucide-react-native";
import React, { Suspense } from "react";

export default function UsersScreen() {
	// const {
	// 	data: users,
	// 	isPending,
	// 	refetch,
	// } = useSuspenseQuery({ ...getUsers({}), select: ({ users }) => users });

	return (
		<SafeAreaView className="flex-1 p-3">
			<View className="flex-row gap-x-2 items-center justify-between">
				<View className="flex-row">
					<Icon name={UsersIcon} size={21} />
					<Text variant="heading" className="text-primary">
						User Accounts
					</Text>
				</View>
			</View>

			{/* <ScrollView> */}
			<Text>Users page experimental</Text>
			<Text>{process.env.EXPO_PUBLIC_API}</Text>

			<Suspense fallback={<UsersFeed.Fallback />}>
				<UsersFeed />
			</Suspense>
			{/* </ScrollView> */}
		</SafeAreaView>
	);
}
