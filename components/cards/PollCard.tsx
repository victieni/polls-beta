import { View, Text, Button } from "@/components/ui";
import React, { ComponentProps } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui";
import { Link, useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";

export default function PollCard({
	poll,
	className,
	...props
}: { poll: IPoll } & ComponentProps<typeof Card>) {
	const router = useRouter();
	return (
		<Card {...props} className={`${className} h-72 shadow-md`}>
			<CardContent>
				<CardHeader>
					<CardTitle>{poll.title}</CardTitle>
					<CardDescription>{poll.description}</CardDescription>
				</CardHeader>

				<View>
					<Text variant="body">{poll.prompt}</Text>
				</View>
				<Link
					asChild
					href={{ pathname: "/poll/[id]", params: { id: poll.id } }}
				>
					<Button icon={ArrowRight} size={"icon"} className="rounded-full" />
				</Link>
			</CardContent>
		</Card>
	);
}
