import { PollForm } from "@/components/forms/PollForm";
import { Icon, SafeAreaView, ScrollView, Text, View } from "@/components/ui";
import { useColor } from "@/hooks/useColor";
import { BookmarkCheck } from "lucide-react-native";
import React from "react";

export default function NewPoll() {
	const primaryColor = useColor("primary");

	return (
		<SafeAreaView className="flex-1  p-3 bg-background">
			<View className="flex-row items-center gap-x-1 p-2">
				<Icon name={BookmarkCheck} size={27} color={primaryColor} />
				<Text variant="title" className="text-primary">
					Create new Poll
				</Text>
			</View>

			<ScrollView className="flex-1 pb-20">
				<PollForm.Main />
			</ScrollView>
		</SafeAreaView>
	);
}
