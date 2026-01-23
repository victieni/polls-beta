import BackBtn from "@/components/btns/BackBtn";
import { RegistrationConfigForm } from "@/components/forms/RegistrationConfigForm";
import Void from "@/components/layout/Void";
import { Icon, SafeAreaView, Skeleton, Text, View } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { getRegistration } from "@/lib/functions/registration.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShieldUser } from "lucide-react-native";
import React, { Suspense } from "react";

export default function RegistrationConfigScreen() {
	const primaryColor = useColor("primary");
	return (
		<SafeAreaView className="flex-1 p-3">
			<View className="py-2 mb-4 relative flex-row items-center justify-center gap-x-1">
				<BackBtn className="absolute top-0 left-0" />
				<Icon
					name={ShieldUser}
					size={30}
					strokeWidth={2}
					color={primaryColor}
				/>
				<Text variant="title" className="text-primary ">
					Registration
				</Text>
			</View>

			<Suspense fallback={<Fallback />}>
				<Main />
			</Suspense>
		</SafeAreaView>
	);
}

const Main = () => {
	const { poll } = usePolls();
	const { data } = useSuspenseQuery(getRegistration(poll!.id));

	const registration = data[0];

	console.log("reg:", registration);

	if (!registration) { // ! consider showing auto form first 
		return (
			<View className="flex-1 justify-between pb-5">
				<Void msg="Registrations not configured. Click button to start👇" />

				<RegistrationConfigForm.Trigger />
			</View>
		);
	}

	return <View className="flex-1">{}</View>;
};

const Fallback = () => (
	<>
		{[...Array(7)].map((_, i) => (
			<View key={i} className="gap-y-2 mb-3">
				<Skeleton className="h-20 rounded-lg" />
				<View className="flex-row justify-between">
					<Skeleton className="size-10 rounded-full" />
					<Skeleton className="size-10 rounded-full" />
				</View>
			</View>
		))}
	</>
);
