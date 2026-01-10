import PollForm from "@/components/forms/PollForm";
import { SafeAreaView, ScrollView, Text } from "@/components/ui";
import React from "react";

export default function NewPoll() {
	return (
		<SafeAreaView className="flex-1  p-3 bg-background">
			<Text variant="title" className="p-3">
				Create new Poll
			</Text>

			<ScrollView className="flex-1 pb-20">
				<PollForm />
			</ScrollView>
		</SafeAreaView>
	);
}
