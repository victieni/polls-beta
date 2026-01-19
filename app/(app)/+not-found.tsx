import { Stack, useRouter } from "expo-router";

import { Button } from "@/components/ui";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

export default function NotFoundScreen() {
	const router = useRouter();

	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					padding: 20,
				}}
			>
				<Text>This screen does not exist.</Text>
				<Button onPress={() => router.replace("/polls")}>Back</Button>
			</View>
		</>
	);
}
