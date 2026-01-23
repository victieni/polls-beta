import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { useCurrentUser } from "@/hooks/util.hooks";
import {
	EyeOff,
	ShieldHalf,
	ShieldPlus,
	ShieldUser,
} from "lucide-react-native";
import React, { ComponentProps, useState } from "react";
import {
	BottomSheet,
	Button,
	Card,
	CardContent,
	Icon,
	Input,
	Switch,
	Text,
	useBottomSheet,
	View,
} from "../ui";
import { useMutation } from "@tanstack/react-query";
import { updateRegistration } from "@/lib/functions/registration.functions";

export default function Main({ successAction }: { successAction: () => void }) {
	const currentUser = useCurrentUser();
	const { poll, registration } = usePolls();
	const [isAnonymous, setIsAnonymous] = useState<boolean>(
		poll!.controls?.allowAnonymous!
	);
	const [regId, setRegId] = useState<string>("");
	const { mutate: update, isPending } = useMutation(updateRegistration);

	const primaryColor = useColor("primary");

	if (!poll || !registration) return;

	const registerHandler = () => {};

	return (
		<View className="gap-y-3">
			{poll.controls?.allowAnonymous && (
				<Card>
					<CardContent className="flex-row items-start">
						<Icon name={EyeOff} color={primaryColor} />
						<View>
							<Switch
								value={isAnonymous}
								onValueChange={setIsAnonymous}
								label="Anonymous"
							/>
							<Text variant="caption" className="text-sm">
								Hide your user identity.
							</Text>
						</View>
					</CardContent>
				</Card>
			)}

			<View className="gap-y-3">
				<Text variant="subtitle">{registration.prompt}</Text>

				<View>
					<Input onChangeText={setRegId} value={regId} icon={ShieldHalf} />

					{registration.description && (
						// <Text variant="caption" className="p-2 rounded-2xl bg-secondary">
						<Text variant="caption" className="text-sm">
							{registration.description}
						</Text>
					)}
				</View>

				<Button
					onPress={registerHandler}
					disabled={isPending}
					loading={isPending}
					icon={ShieldPlus}
					className={""}
				>
					Register
				</Button>
			</View>
		</View>
	);
}
const Trigger = ({
	className,
	children,
	...props
}: ComponentProps<typeof Button>) => {
	const { close, open, isVisible } = useBottomSheet();

	return (
		<>
			{children ? (
				<View onTouchStart={open}>{children}</View>
			) : (
				<Button
					{...props}
					icon={ShieldUser}
					variant="outline"
					onPress={open}
					className={`${className} `}
				>
					Registration
				</Button>
			)}
			<BottomSheet
				title={"Register"}
				isVisible={isVisible}
				onClose={close}
				snapPoints={[0.6, 0.8]}
			>
				<Main successAction={close} />
			</BottomSheet>
		</>
	);
};

export const RegisterForm = { Main, Trigger };
