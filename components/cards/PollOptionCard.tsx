import React, { ComponentProps } from "react";
import { Card, CardContent, CardTitle, Icon, Text } from "../ui";
import { Option } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { PollOptionsForm } from "../forms/PollOptionsForm";
import { usePolls } from "@/contexts/polls.context";

const Main = ({
	opt,
	className,
	...props
}: { opt: IPollOption } & ComponentProps<typeof Card>) => {
	const mutedForeground = useColor("mutedForeground");

	const { setPollOption } = usePolls();

	return (
		<PollOptionsForm.SheetTrigger touchAction={() => setPollOption(opt)}>
			<Card {...props} className={`${className} relative`}>
				<CardContent>
					<CardTitle>{opt.name}</CardTitle>
					<Text variant="caption" className="line-clamp-1">
						{opt.description}
					</Text>
					<Icon
						name={Option}
						color={mutedForeground}
						strokeWidth={3}
						size={15}
						className="absolute top-0 right-0"
					/>
				</CardContent>
			</Card>
		</PollOptionsForm.SheetTrigger>
	);
};

const Progress = ({
	opt,
	className,
	...props
}: ComponentProps<typeof Main>) => {
	return (
		<Card
			{...props}
			className={`${className} border-2 border-secondary bg-transparent `}
		>
			<CardContent>
				<Text variant="subtitle">{opt.name}</Text>
			</CardContent>
		</Card>
	);
};

export const PollOptionCard = { Main, Progress };
