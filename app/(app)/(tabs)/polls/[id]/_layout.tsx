import { PollsProvider } from "@/contexts/polls.context";
import { Stack } from "expo-router";
import React from "react";

export default function PollLayout() {
	return (
		<PollsProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen
					name="config"
					options={{ presentation: "modal", sheetGrabberVisible: true }}
				/>
				<Stack.Screen
					name="registration"
					options={{ presentation: "modal", sheetGrabberVisible: true }}
				/>
				<Stack.Screen name="results" />
			</Stack>
		</PollsProvider>
	);
}
