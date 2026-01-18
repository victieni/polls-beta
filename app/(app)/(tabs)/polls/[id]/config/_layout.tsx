import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen name="adminPanel" />
			<Stack.Screen
				name="controls"
				options={{ presentation: "modal", sheetGrabberVisible: true }}
			/>
			<Stack.Screen
				name="registration"
				options={{ presentation: "modal", sheetGrabberVisible: true }}
			/>
		</Stack>
	);
}
