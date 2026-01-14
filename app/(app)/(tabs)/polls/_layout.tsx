import { PollsProvider } from "@/contexts/polls.context";
import { Stack } from "expo-router";
import React from "react";

export default function PollLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="[id]" />
		</Stack>
	);
}
