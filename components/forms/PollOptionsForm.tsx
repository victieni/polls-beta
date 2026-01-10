import { View, Text } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { usePollOptionForm } from "@/hooks/formHooks";
import React, { Suspense } from "react";
import OptionsFeed from "../Feeds/OptionsFeed";

export default function PollOptionsForm() {
	const { editPoll, newPoll } = usePolls();

	const form = usePollOptionForm();

	if (!editPoll || !newPoll) return;

	return (
		<View>
			<Suspense fallback={<OptionsFeed.Fallback />}>
				<OptionsFeed poll={newPoll ?? editPoll} />
			</Suspense>
			<Text> asdf</Text>
		</View>
	);
}
