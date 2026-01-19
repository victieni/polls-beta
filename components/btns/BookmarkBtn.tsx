import React from "react";
import { Button, Icon, Text } from "../ui";
import { useMutation } from "@tanstack/react-query";
import { updatePoll } from "@/lib/functions/poll.functions";
import { useAuth } from "@clerk/clerk-expo";
import { Bookmark } from "lucide-react-native";
import { useUsers } from "@/contexts/users.context";
import { useCurrentUser } from "@/hooks/util.hooks";

export default function BookmarkBtn({ poll }: { poll: IPoll }) {
	const {} = useAuth;
	const { mutate, isPending } = useMutation(updatePoll);
	const currentUser = useCurrentUser();

	console.log(currentUser);

	const bookmarksArr =
		poll.meta!.bookmarks?.map((b) => {
			const user = b as IUser;

			return user.id;
		}) ?? [];

	return (
		<Button variant="secondary">
			<Icon name={Bookmark} />
			<Text>{bookmarksArr.length}</Text>
		</Button>
	);
}
