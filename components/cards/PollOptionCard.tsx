import React, { ComponentProps } from "react";
import { Card, CardContent, Text } from "../ui";

export default function PollOptionCard({
	opt,
	className,
	...props
}: { opt: IPollOption } & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={`${className} `}>
			<CardContent>
				<Text variant="subtitle">{opt.name}</Text>
			</CardContent>
		</Card>
	);
}
