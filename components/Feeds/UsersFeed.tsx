import { getInfiniteUsers } from "@/lib/functions/user.functions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList } from "react-native";
import UserCard from "../cards/UserCard";
import { Text, View } from "../ui";

export default function UsersFeed() {
	const {
		data: users,
		refetch,
		isRefetching,
	} = useSuspenseInfiniteQuery({
		...getInfiniteUsers({}),
		select: (d) => d.pages.flatMap((d) => d.users),
	});

	console.log(users);

	return (
		<View className="flex-1 p-3">
			<FlatList
				data={users}
				renderItem={({ item }) => <UserCard user={item} className="mb-1" />}
				keyExtractor={(item) => item.id}
				onRefresh={() => refetch}
				// ItemSeparatorComponent={ }
				// ItemSeparatorComponent={}
				refreshing={isRefetching}
			/>

			{/* {users.map((u) => (
				<UserCard user={u} key={u.id} />
			))} */}
		</View>
	);
}

UsersFeed.Fallback = () => {
	return (
		<View>
			<Text>Loading users...</Text>
		</View>
	);
};
