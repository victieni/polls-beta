import BackBtn from "@/components/btns/BackBtn";
import { SafeAreaView, Text, View } from "@/components/ui";
import React from "react";

export default function Registration() {
	return (
		<SafeAreaView className="flex-1 p-3">
			<View>
				<BackBtn />
				<Text>registration</Text>
			</View>
		</SafeAreaView>
	);
}
