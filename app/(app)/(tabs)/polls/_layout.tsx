import PollsSuspenseBoundary from "@/components/layout/PollsSuspenseBoundary";
import { Stack } from "expo-router";
import React from "react";

export default function PollLayout() {
	return (
		<PollsSuspenseBoundary>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="[id]" />
			</Stack>
		</PollsSuspenseBoundary>
	);
}
