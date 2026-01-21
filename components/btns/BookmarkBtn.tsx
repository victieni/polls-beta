import { useColor } from "@/hooks/useColor";
import { useCurrentUser } from "@/hooks/util.hooks";
import { updatePoll } from "@/lib/functions/poll.functions";
import { useMutation } from "@tanstack/react-query";
import { Bookmark } from "lucide-react-native";
import React, { useState } from "react";
import { Button, Icon, Text } from "../ui";

export default function BookmarkBtn({ poll }: { poll: IPoll }) {
	const { mutate: update, isPending } = useMutation(updatePoll);
	const [bookmarksArr, setBookmarksArr] = useState<string[]>(
		poll.meta?.bookmarks?.map((b) => b.id) ?? []
	);
	const currentUser = useCurrentUser();

	const primaryColor = useColor("primary");
	const secondaryForeground = useColor("secondaryForeground");

	const hasBookMarked = !!bookmarksArr.find((id) => id === currentUser.id);

	// console.log("out", hasBookMarked, bookmarksArr);
	const bookmarkHandler = () => {
		let cleanData: string[];

		if (hasBookMarked) {
			// setBookmarksArr((prev) => prev.filter((id) => id !== currentUser.id));
			cleanData = bookmarksArr.filter((id) => id !== currentUser.id);
		} else {
			// setBookmarksArr((prev) => [...prev, currentUser.id]);
			cleanData = [...bookmarksArr, currentUser.id];
		}
		setBookmarksArr(cleanData);
		console.log("in", hasBookMarked, cleanData);
		update({ ...poll, meta: { bookmarks: cleanData } });
	};

	return (
		<Button
			disabled={isPending}
			variant="secondary"
			size="sm"
			className="px-3 py-0!"
			onPress={bookmarkHandler}
		>
			<Icon
				name={Bookmark}
				size={17}
				fill={hasBookMarked ? primaryColor : "transparent"}
				stroke={hasBookMarked ? primaryColor : secondaryForeground}
			/>
			<Text
				className={`${
					hasBookMarked ? "text-primary!" : ""
				} font-medium text-sm`}
			>
				{bookmarksArr.length}
			</Text>
		</Button>
	);
}
