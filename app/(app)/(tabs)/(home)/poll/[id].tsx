import { View, Text } from "@/components/ui";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function PolScreen() {
  const {id} = useLocalSearchParams()
	return (
		<View>
			<Text>{id}</Text>
		</View>
	);
}
