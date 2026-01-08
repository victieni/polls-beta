import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/theme/theme-provider";

export default function AuthRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="sign-in" />
					<Stack.Screen name="sign-up" />
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
