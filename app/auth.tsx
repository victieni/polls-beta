import { AvoidKeyboard } from "@/components/ui/avoid-keyboard";
import {
	UButton,
	UIcon,
	UImage,
	UInput,
	USafeAreaView,
	UText,
	UView,
} from "@/components/uniwind";
import { useRouter } from "expo-router";
import { BookA, ChevronLeft, LockIcon, Mail, UserCircle2 } from "lucide-react-native";
import React from "react";
import VoteImg from "../assets/images/vote.png";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const router = useRouter();
	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");

	return (
		<USafeAreaView className="flex-1 ">
			<UView className="flex-1 items-center p-3 gap-2 ">
				<UImage
					source={VoteImg}
					alt="vote"
					placeholder={"voting"}
					priority={"high"}
					// contentFit="cover"
					width={"30%"}
					aspectRatio={1}
					variant="rounded"
					errorFallbackText="loading img failed"
					className="size20 mx-auto bg-none"
				/>
				<UView className="flex-row items-center justify-center gap-1 text-green-600">
					<UIcon name={UserCircle2} size={30} />

					<UText variant="heading">Log in</UText>
				</UView>

				<UView className="gap-y-3">
					<UInput
						label="Email"
						icon={Mail}
						variant="outline"
						autoCapitalize="none"
						keyboardType="email-address"
						placeholder="Enter email..."
						onChangeText={setEmail}
					/>
					<UInput
						label="Password"
						icon={LockIcon}
						variant="filled"
						keyboardType="web-search"
						secureTextEntry
						onChangeText={setPassword}
						placeholder="Enter Password..."
					/>

					<UInput label="Description" icon={BookA} type="textarea" />
				</UView>

				<UView className="flex-row gap-2">
					<UButton size="icon" variant="outline" onPress={() => router.back()}>
						<UIcon name={ChevronLeft} />
					</UButton>
					<UButton size="sm" className="w-fit mx-auto">
						<UIcon name={LockIcon} />
						<UText className="text-destructive">Log in</UText>
					</UButton>
				</UView>

				<AvoidKeyboard />
			</UView>
		</USafeAreaView>
	);
}
