import { Skeleton, View } from "@/components/ui";
import { getPolls } from "@/lib/functions/poll.functions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList } from "react-native";
import { PollCard } from "../cards/PollCard";
import Void from "../layout/Void";

export default function PollsFeed({
	voidMsg,
	...queryParams
}: { voidMsg?: string } & Parameters<typeof getPolls>["0"]) {
	const { data: polls } = useSuspenseInfiniteQuery({
		...getPolls(queryParams),
		select: (data) => data.pages.flatMap((d) => d.polls),
	});

	console.log("Polls", polls.length);

	return (
		// ? DisPlay void Element.
		<View className="flex-1 mb-20">
			{polls.length > 0 ? (
				<FlatList
					data={polls}
					keyExtractor={(poll) => poll.id}
					renderItem={({ item: poll, separators }) => (
						<View className="mb-3">
							<PollCard.Main poll={poll} />
						</View>
					)}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<Void msg={voidMsg ?? "Sorry no polls found😢."} />
			)}
		</View>
	);
}

PollsFeed.Fallback = () => {
	return (
		<View className="flex-1 gap-y-2">
			{[...Array(7)].map((_, i) => (
				<Skeleton key={i} className="h-[70vh] rounded-2xl" />
			))}
		</View>
	);
};
