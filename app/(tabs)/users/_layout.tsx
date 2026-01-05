import UsersProvider from "@/contexts/users.context";
import { getUsers } from "@/lib/functions/user.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";

export default function UserLayout() {

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
