import UsersFeed from "@/components/Feeds/UsersFeed";
import { Icon } from "@/components/ui";
import {
	UButton,
	UIcon,
	USafeAreaView,
	UText,
	UView,
} from "@/components/uniwind";
import UsersProvider from "@/contexts/users.context";
import { getUsers } from "@/lib/functions/user.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader, RefreshCw, UsersIcon } from "lucide-react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";


export default function UsersScreen() {
	const { data, isPending, isLoading, isFetching, refetch } = useSuspenseQuery(
		getUsers()
	);

	console.log(
		"pending",
		isPending,
		"isLoading",
		isLoading,
		"fetching",
		isFetching,"data:", data?.users
	);

	return (
		<USafeAreaView className="flex-1 p-3">
			<UView className="flex-row gap-x-2 items-center justify-between">
				<UView className="flex-row">
					<Icon name={UsersIcon} size={21} />
					<UText variant="heading" className="text-primary">
						User Accounts
					</UText>
				</UView>
				<UButton size="icon" variant="outline" onPress={refetch}>
					<UIcon name={RefreshCw} />
				</UButton>
			</UView>

			<UView>
				{isPending && (
					<UText>
						<UIcon name={Loader} size={20} className="animate-spin" />
					</UText>
				)}
			</UView>

			<ScrollView>
				<UText>Users page experimental</UText>
				<UText>{process.env.EXPO_PUBLIC_API}</UText>
				<UsersProvider usersInit={data?.users!}>
					<UsersFeed />
				</UsersProvider>
			</ScrollView>
		</USafeAreaView>
	);
}
