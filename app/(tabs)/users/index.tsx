import { Icon } from "@/components/ui";
import { USafeAreaView, UText, UView } from "@/components/uniwind";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { UsersIcon } from "lucide-react-native";
import { getUsers } from "@/lib/functions/user.functions";

export default function UsersScreen() {
	const [users, setUsers] = useState<IUser[]>();

	console.log(users);

	useEffect(() => {
		const fetchUsers = async () => setUsers((await getUsers()).users);

		if (!users) fetchUsers();
	}, [users]);

	return (
		<USafeAreaView className="flex-1 p-3">
			<UView className="flex-row gap-x-2 items-center">
				<Icon name={UsersIcon} size={21} />
				<UText variant="heading" className="text-primary">
					User Accounts
				</UText>
			</UView>
			<ScrollView>
				<UText>Users page experimental</UText>
				<UText>{process.env.EXPO_PUBLIC_API}</UText>
			</ScrollView>
		</USafeAreaView>
	);
}
