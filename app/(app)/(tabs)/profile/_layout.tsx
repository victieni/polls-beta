import { useColor } from "@/hooks/useColor";
import { Stack } from "expo-router";
import React from "react";

export default function UserLayout() {
	const cardColor = useColor("card");

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="settings"
				options={{
					presentation: "pageSheet",
					sheetGrabberVisible: true,
					sheetAllowedDetents: [0.4, 0.7, 1],
					sheetInitialDetentIndex: 0,
					sheetExpandsWhenScrolledToEdge: true,
					contentStyle: {
						// backgroundColor: cardColor,
						backgroundColor: "transparent",
					},
				}}
			/>
		</Stack>
	);
}
