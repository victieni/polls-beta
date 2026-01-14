import { PollsProvider } from "@/contexts/polls.context";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
	return (
		<PollsProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen
					name="[id]"
					options={{
						presentation: "modal",
						sheetGrabberVisible: true,

						// sheetInitialDetentIndex: 1,
					}}
				/>
			</Stack>
		</PollsProvider>
	);
}
