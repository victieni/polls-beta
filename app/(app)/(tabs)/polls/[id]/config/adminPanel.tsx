import BackBtn from "@/components/btns/BackBtn";
import { Icon, SafeAreaView, Text, View } from "@/components/ui";
import { useColor } from "@/hooks/useColor";
import { UserCircle } from "lucide-react-native";
import React from "react";

export default function AdminConfigScreen() {
	const primaryColor = useColor("primary");
	return (
		<SafeAreaView className="flex-1 p-3">
			<View className="py-2 mb-4 relative flex-row items-center justify-center gap-x-1">
				<BackBtn className="absolute top-0 left-0" />
				<Icon
					name={UserCircle}
					size={30}
					strokeWidth={2}
					color={primaryColor}
				/>
				<Text variant="title" className="text-primary ">
					Administrators
				</Text>
			</View>
			<View>
				<Text>Admin Config</Text>
			</View>
		</SafeAreaView>
	);
}
