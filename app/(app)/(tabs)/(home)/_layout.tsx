import { Stack } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { useColor } from "@/hooks/useColor";
import { Text } from "@/components/ui/text";

export default function HomeLayout() {
	const theme = useColorScheme();
	const text = useColor("text");
	const background = useColor("background");

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
