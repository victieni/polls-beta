import UsersFeed from "@/components/Feeds/UsersFeed";
import { Icon } from "@/components/ui";
import {
	UButton,
	UIcon,
	USafeAreaView,
	UText,
	UView,
} from "@/components/uniwind";
import UsersProvider, { useUsers } from "@/contexts/users.context";
import { Loader, RefreshCw, UsersIcon } from "lucide-react-native";
import React, { Suspense } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function UsersScreen() {
	// const {
	// 	data: users,
	// 	isPending,
	// 	refetch,
	// } = useSuspenseQuery({ ...getUsers({}), select: ({ users }) => users });

	return (
		<USafeAreaView className="flex-1 p-3">
			<UView className="flex-row gap-x-2 items-center justify-between">
				<UView className="flex-row">
					<Icon name={UsersIcon} size={21} />
					<UText variant="heading" className="text-primary">
						User Accounts
					</UText>
				</UView>
				{/* <UButton size="icon" variant="outline" onPress={refetch}>
						<UIcon name={RefreshCw} />
					</UButton> */}
			</UView>

			<UView>
				{/* {isPending && (
						<UText>
							<UIcon name={Loader} size={20} className="animate-spin" />
						</UText>
					)} */}
			</UView>

			{/* <ScrollView> */}
			<UText>Users page experimental</UText>
			<UText>{process.env.EXPO_PUBLIC_API}</UText>

			<Suspense fallback={<UsersFeed.Fallback />}>
				<UsersFeed />
			</Suspense>
			{/* </ScrollView> */}
		</USafeAreaView>
	);
}
