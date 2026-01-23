import React, { ComponentProps } from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	Text,
	View,
} from "../ui";

export default function UserCard({
	user,
	className,
	...props
}: {
	user: IUser;
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={`${className}`}>
			<CardContent className="flex-row gap-x-2">
				<Avatar>
					<AvatarImage source={{ uri: user.imageUrl! }} />
					<AvatarFallback>{user.fname[0]}</AvatarFallback>
				</Avatar>
				<View>
					<Text variant="subtitle">
						{user.fname} {user.lname}
					</Text>
					<Text variant="caption" className="text-muted-foreground">
						@{user.username}
					</Text>
				</View>
			</CardContent>
		</Card>
	);
}
