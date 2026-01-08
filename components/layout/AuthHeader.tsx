import { View, Text, Image } from "@/components/ui";
import React from "react";
import logo from "@/assets/images/icon.png";

export default function AuthHeader() {
	return (
		<View className="gap-2">
			<Image
				source={logo}
				priority={"high"}
				variant="rounded"
				width={"150"}
				height={"150"}
				contentFit="cover"
				className=""
			/>
			<Text variant="heading" className="text-center text-primary">
				Polls
			</Text>
		</View>
	);
}
