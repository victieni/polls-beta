import { Skeleton, View } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { getPollOptions } from "@/lib/functions/PollOption.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { PollOptionCard } from "../cards/PollOptionCard";
import Void from "../layout/Void";

export default function OptionsFeed({ isProgress }: { isProgress?: boolean }) {
	const { poll, setPollOptions } = usePolls();


	const { data: pollOptions, isFetching } = useSuspenseQuery(
		getPollOptions(poll?.id!)
	);

	useEffect(() => {
		setPollOptions(pollOptions);
	}, [isFetching]);

	if (!poll) return;

	return (
		<View>
			{pollOptions.length > 0 ? (
				<FlatList
					data={pollOptions.sort((a, b) => a.order! - b.order!)} // ? Sort by order
					// keyExtractor={(opt) => opt.id}
					renderItem={({ item: opt }) =>
						isProgress ? (
							<PollOptionCard.Progress opt={opt} className="mb-2" />
						) : (
							<PollOptionCard.Main opt={opt} className="mb-2" />
						)
					}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ columnGap: 2 }}
					// className="gap-3"
				/>
			) : (
				<Void msg="No poll options! Click button bellow to add." />
			)}
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
