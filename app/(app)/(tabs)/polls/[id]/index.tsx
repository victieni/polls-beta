import OptionsFeed from "@/components/Feeds/OptionsFeed";
import { SafeAreaView, Skeleton, Text, View } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { getPoll } from "@/lib/functions/poll.functions";
import { getPollOptions } from "@/lib/functions/PollOption.functions";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense, useEffect } from "react";

export default function PollScreen() {
	const { id } = useLocalSearchParams();

	return (
		<SafeAreaView className="px-3">
			<Suspense fallback={<Fallback />}>
				<Main id={id as string} />
			</Suspense>
		</SafeAreaView>
	);
}

const Main = ({ id }: { id: string }) => {
	const [{ data: poll }, { data: pollOptions }] = useSuspenseQueries({
		queries: [getPoll(id), getPollOptions(id)],
	});

	const { setPoll, setPollOptions } = usePolls();

	useEffect(() => {
		setPoll(poll);
		setPollOptions(pollOptions);
	}, [poll, `${pollOptions}`]);

	return (
		<View>
			<View>
				<Text variant="heading">{poll.title}</Text>
			</View>

			<View>
				<OptionsFeed isProgress />
			</View>
			{/* <PollCard.Main poll={poll} /> */}
		</View>
	);
};

const Fallback = () => {
	return (
		<View>
			<Skeleton className="h-72 rounded-2xl" />
		</View>
	);
};
