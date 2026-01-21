import { PollsProvider } from "@/contexts/polls.context";
import { Stack } from "expo-router";
import React from "react";

export default function PollLayout() {
	return (
		<PollsProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="config" options={{ presentation: "modal" }} />
				<Stack.Screen name="results" />
				<Stack.Screen name="registration" />
			</Stack>
		</PollsProvider>
	);
}
