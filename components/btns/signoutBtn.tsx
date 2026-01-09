import { useClerk } from "@clerk/clerk-expo";
import { LogOut } from "lucide-react-native";
import { Text } from "react-native";
import { AlertDialog, Button, Icon, useAlertDialog } from "../ui";
import { useTransition } from "react";

export const SignOutButton = () => {
	const { isVisible, close, open } = useAlertDialog();
	const [isPending, startTransition] = useTransition();
	const { signOut } = useClerk();

	const handleSignOut = () => {
		try {
			startTransition(async () => await signOut());
			// Redirect to your desired page
			// Linking.openURL(Linking.createURL("/"));
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};
	return (
		<>
			<Button
				onPress={open}
				disabled={isPending}
				loading={isPending}
				className="flex"
			>
				<Icon name={LogOut} size={24} className="text-foreground" />
				<Text>Sign out</Text>
			</Button>

			<AlertDialog
				isVisible={isVisible}
				title="Confirm Sign out"
				description="Are you sure you want to sign out?"
				confirmText="Sign out"
				onClose={close}
				onConfirm={handleSignOut}
			/>
		</>
	);
};
