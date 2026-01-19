import GoogleSigninBtn from "@/components/btns/GoogleSigninBtn";
import AuthFooter from "@/components/layout/AuthFooter";
import AuthHeader from "@/components/layout/AuthHeader";
import {
	Input,
	Button,
	SafeAreaView,
	Text,
	View,
	Link,
	Separator,
} from "@/components/ui";
import { AvoidKeyboard } from "@/components/ui/avoid-keyboard";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState, useTransition } from "react";
import { Lock, Mail } from "lucide-react-native";

export default function Page() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	// Handle the submission of the sign-in form
	const onSignInPress = async () => {
		if (!isLoaded) return;

		// Start the sign-in process using the email and password provided
		try {
			startTransition(async () => {
				const signInAttempt = await signIn.create({
					identifier: emailAddress,
					password,
				});

				// If sign-in process is complete, set the created session as active
				// and redirect the user
				if (signInAttempt.status === "complete") {
					await setActive({ session: signInAttempt.createdSessionId });
					router.replace("/polls");
				} else {
					// If the status isn't complete, check why. User might need to
					// complete further steps.
					console.error(JSON.stringify(signInAttempt, null, 2));
				}
			});
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<SafeAreaView className="flex-1 p-3 gap-y-3 justify-center items-center ">
			<AuthHeader />

			<View className="gap-y-2 items-center flex-1 justify-center">
				<Text variant="title" className="textprimary">
					Sign in
				</Text>
				<Input
					icon={Mail}
					autoCapitalize="none"
					value={emailAddress}
					placeholder="Enter email"
					onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
				/>
				<Input
					value={password}
					icon={Lock}
					placeholder="Enter password"
					secureTextEntry={true}
					onChangeText={setPassword}
				/>
				<Button
					disabled={isPending}
					loading={isPending}
					onPress={onSignInPress}
				>
					Continue
				</Button>

				<View className="flex-row items-center justify-center gap-x-2">
					<Text variant="caption">Don't have an account?</Text>
					<Link href="/(app)/auth/sign-up">
						<Text variant="link">Sign up</Text>
					</Link>
				</View>

				<Separator className="my-2" />
				<GoogleSigninBtn className="w-full" />
			</View>
			<AvoidKeyboard />

			<AuthFooter />
		</SafeAreaView>
	);
}
