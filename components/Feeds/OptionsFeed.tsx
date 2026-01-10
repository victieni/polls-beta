import { View, Text, Skeleton } from "@/components/ui";
import { getPollOptions } from "@/lib/functions/PollOption.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export default function OptionsFeed({ poll }: { poll: IPoll }) {
	const { data, isPending } = useSuspenseQuery(getPollOptions(poll.id));

	console.log("isPending", isPending, "Poll Options", data);

	return (
		<View>
			<Text>Options Feed</Text>
		</View>
	);
}

OptionsFeed.Fallback = () => {
	return (
		<View>
			<Text>Loading users...</Text>
		</View>
	);
};
