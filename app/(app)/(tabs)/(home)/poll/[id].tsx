import PollCard from "@/components/cards/PollCard";
import { View, Text, Skeleton, SafeAreaView } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { getPoll } from "@/lib/functions/poll.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense } from "react";

export default function PollScreen() {
	const { id } = useLocalSearchParams();

	return (
		<SafeAreaView className="px-3">
			<Text>{id}</Text>

			<Suspense fallback={<PollScreen.Fallback />}>
				<Main id={id as string} />
			</Suspense>
		</SafeAreaView>
	);
}

const Main = ({ id }: { id: string }) => {
	const { data: poll } = useSuspenseQuery(getPoll(id));

	const { setPoll } = usePolls();
	setPoll(poll);

	return (
		<View>
			<PollCard poll={poll} />
		</View>
	);
};

PollScreen.Fallback = () => {
	return (
		<View>
			<Skeleton className="h-72 rounded-2xl" />
		</View>
	);
};
