import BackBtn from "@/components/btns/BackBtn";
import BookmarkBtn from "@/components/btns/BookmarkBtn";
import OptionsFeed from "@/components/Feeds/OptionsFeed";
import {
	Badge,
	Button,
	Icon,
	Link,
	SafeAreaView,
	ScrollView,
	Skeleton,
	Text,
	View,
} from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { useCurrentUser, usePollAdmin } from "@/hooks/util.hooks";
import { getPoll } from "@/lib/functions/poll.functions";
import { getPollOptions } from "@/lib/functions/PollOption.functions";
import { ePollType } from "@/polls-backend/typescript/enum";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ArrowRight, GitFork, Settings, ShieldUser } from "lucide-react-native";
import React, { Suspense, useEffect } from "react";

export default function PollScreen() {
	const { id } = useLocalSearchParams();

	return (
		<SafeAreaView className="flex-1 px-3">
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

	const primaryColor = useColor("primary");
	// const currentUser = useCurrentUser();

	const { setPoll, setPollOptions } = usePolls();
	const { isAdmin, isCreator } = usePollAdmin(poll);

	useEffect(() => {
		setPoll(poll);
		setPollOptions(pollOptions);
	}, [poll, `${pollOptions}`]);

	return (
		<View>
			<View className="p-2 flex-row items-center gap-x-2">
				<BackBtn />
				<Text variant="heading" className="text-primary line-clamp-1">
					{poll.title}
				</Text>
			</View>

			<ScrollView className="" contentContainerClassName="flex1 gap-y-4">
				<View className="gap-y-3">
					<Text variant="heading">{poll.prompt}</Text>

					<View className="p-2  bg-muted rounded-3xl">
						<Text variant="caption" className="px-3">
							{poll.description}
						</Text>
						{poll.about && (
							// Bottom Sheet for about
							<Button size="sm" variant="ghost" className="w-fit ml-auto">
								<Text className="text-primary">More</Text>
								<Icon name={ArrowRight} size={20} color={primaryColor} />
							</Button>
						)}
					</View>

					<View className="flex-row items-center justify-between">
						<Badge className="w-fit flex-row items-center gap-x-1 bg-primary/40 dark:bg-primary/20 border-2 border-primary py-1">
							<Icon
								name={GitFork}
								size="15"
								color={primaryColor}
								strokeWidth={3}
							/>
							<Text className="capitalize font-medium text-primary text-sm">
								{poll.type}
							</Text>
						</Badge>

						<BookmarkBtn poll={poll} />
					</View>
				</View>

				<OptionsFeed isProgress />

				{(isAdmin || isCreator) && (
					<Link
						href={{ pathname: "/polls/[id]/config", params: { id } }}
						asChild
					>
						<Button icon={Settings}>Poll settings</Button>
					</Link>
				)}

				{poll.controls?.registrationIsRequired && (
					<Link
						href={{ pathname: "/polls/[id]/registration", params: { id } }}
						asChild
					>
						<Button icon={ShieldUser} variant="outline">
							Registration
						</Button>
					</Link>
				)}
			</ScrollView>
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
