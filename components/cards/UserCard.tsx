import React from "react";
import { UCard, UCardContent } from "../ui";
import { UText } from "../uniwind";

export default function UserCard({ user }: { user: IUser }) {
	return (
		<UCard>
			<UCardContent>
				<UText>
					{user.fname} {user.lname}
				</UText>
			</UCardContent>
		</UCard>
	);
}
