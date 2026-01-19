import React from "react";
import { Button, Icon } from "../ui";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function BackBtn() {
	const router = useRouter();

	return (
		<Button size="icon" variant="secondary" onPress={router.back}>
			<Icon name={ChevronLeft} size={30} strokeWidth={3} />
		</Button>
	);
}
