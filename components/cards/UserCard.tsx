import React from "react";
import { UCard, UCardContent } from "../ui";
import { UAvatar, UAvatarFallback, UAvatarImage } from "../ui/avatar";
import { UText, UView } from "../uniwind";

export default function UserCard({
	user,
	className,
}: {
	user: IUser;
	className?: string;
}) {
	return (
		<UCard className={className}>
			<UCardContent className="flex-row gap-x-2">
				<UAvatar>
					<UAvatarImage source={{ uri: user.imageUrl! }} />
					<UAvatarFallback>{user.fname[0]}</UAvatarFallback>
				</UAvatar>
				<UView>
					<UText variant="subtitle">
						{user.fname} {user.lname}
					</UText>
					<UText variant="caption" className="text-muted-foreground">
						@{user.username}
					</UText>
				</UView>
			</UCardContent>
		</UCard>
	);
}
