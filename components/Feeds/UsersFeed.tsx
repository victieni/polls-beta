import { useUsers } from "@/contexts/users.context";
import React from "react";
import { FlatList } from "react-native";
import UserCard from "../cards/UserCard";
import { UText, UView } from "../uniwind";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteUsers } from "@/lib/functions/user.functions";
import { Separator } from "../ui/separator";

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
		<UView className="flex-1 p-3">
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
		</UView>
	);
}

UsersFeed.Fallback = () => {
	return (
		<UView>
			<UText>Loading users...</UText>
		</UView>
	);
};
