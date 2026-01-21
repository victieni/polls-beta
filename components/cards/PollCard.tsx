import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Separator,
	Text,
	View,
} from "@/components/ui";
import { PollsProvider } from "@/contexts/polls.context";
import { Link, useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React, { ComponentProps, Suspense } from "react";
import OptionsFeed from "../Feeds/OptionsFeed";
import { useQueryClient } from "@tanstack/react-query";

function Main({
	poll,
	className,
	...props
}: { poll: IPoll } & ComponentProps<typeof Card>) {
	const router = useRouter();
	const queryClient = useQueryClient();

	return (
		<PollsProvider initPoll={poll}>
			<Card {...props} className={`${className} h-[70vh] shadow-md`}>
				<CardContent className="gap-y-3">
					<CardHeader>
						<CardTitle>{poll.title}</CardTitle>
						<CardDescription>{poll.description}</CardDescription>
					</CardHeader>
					<Separator />

					<View>
						<Text variant="body">{poll.prompt}</Text>
					</View>

					<Suspense fallback={<OptionsFeed.Fallback />}>
						<OptionsFeed isProgress />
					</Suspense>

					<Link
						asChild
						href={{ pathname: "/polls/[id]", params: { id: poll.id } }}
					>
						<Button icon={ArrowRight} size={"icon"} className="rounded-full" />
					</Link>
				</CardContent>
			</Card>
		</PollsProvider>
	);
}

const Skeleton = ({ className, ...props }: ComponentProps<typeof Card>) => (
	<Card {...props} className={`${className} h-80 `}>
		<CardContent>
			<CardHeader>
				<Skeleton className="h-5" />
				<Skeleton className="h-3 w-2/3" />
			</CardHeader>
			<Skeleton className="my-3" />

			<View></View>
		</CardContent>
	</Card>
);

export const PollCard = { Main, Skeleton };
