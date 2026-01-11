import { Skeleton, Text, View } from "@/components/ui";
import { getPolls } from "@/lib/functions/poll.functions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList } from "react-native";
import PollCard from "../cards/PollCard";
import { ePollType } from "@/polls-backend/typescript/enum";

export default function PollsFeed({
	...queryParams
}: Parameters<typeof getPolls>["0"]) {
	const { data: polls, isPending } = useSuspenseInfiniteQuery({
		...getPolls(queryParams),
		select: (data) => data.pages.flatMap((d) => d.polls),
	});

	console.log("Polls", polls);

	return (
		<View className="flex-1 mb-20">
			<FlatList
				data={polls}
				keyExtractor={(poll) => poll.id}
				renderItem={({ item: poll, separators }) => (
					<View className="mb-3">
						<PollCard poll={poll} />
					</View>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

export const PollsFeedBookmarks = () => {
	const { data: polls, refetch } = useSuspenseInfiniteQuery({
		...getPolls({}),
		select: (data) => data.pages.flatMap((d) => d.polls),
	});

	return (
		<View className="flex-1">
			<FlatList
				data={polls}
				keyExtractor={(poll) => poll.id}
				renderItem={({ item: poll, separators }) => (
					<View className="mb-2">
						<PollCard poll={poll} />
					</View>
				)}
			/>
		</View>
	);
};

PollsFeed.Fallback = () => {
	return (
		<View className="flex-1 gap-y-2">
			{[...Array(7)].map((_, i) => (
				<Skeleton key={i} className="h-52 rounded-2xl" />
			))}
		</View>
	);
};
