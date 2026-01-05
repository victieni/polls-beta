import { useUsers } from "@/contexts/users.context";
import React from "react";
import { FlatList } from "react-native";
import UserCard from "../cards/UserCard";
import { UText, UView } from "../uniwind";

export default function UsersFeed() {
	const { users } = useUsers();

	console.log(users);

	return (
		<UView className="flex-1 p-3">
			{/* <FlatList
				data={users}
				renderItem={({ item }) => <UserCard user={item} />}
			/> */}

			{users ? (
				users.map((u) => <UserCard user={u} key={u.id} />)
			) : (
				<UText>Loading..</UText>
			)}
		</UView>
	);
}
