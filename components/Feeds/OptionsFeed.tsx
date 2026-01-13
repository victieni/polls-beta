import { View, Text, Skeleton } from "@/components/ui";
import { getPollOptions } from "@/lib/functions/PollOption.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList } from "react-native";
import PollOptionCard from "../cards/PollOptionCard";

export default function OptionsFeed({ poll }: { poll: IPoll }) {
	const { data: pollOptions, isPending } = useSuspenseQuery(
		getPollOptions(poll.id)
	);

	console.log("isPending", isPending, "Poll Options", pollOptions);

	if (pollOptions.length < 1) return;

	return (
		<View>
			<FlatList
				data={pollOptions}
				keyExtractor={(opt) => opt.id}
				renderItem={({ item: opt }) => <PollOptionCard opt={opt} />}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

OptionsFeed.Fallback = () => {
	return (
		<View className="gap-y-2">
			{[...Array(3)].map((_, i) => (
				<Skeleton key={i} className="h-12 rounded-xl" />
			))}
		</View>
	);
};
