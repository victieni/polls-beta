import OptionsFeed from "@/components/Feeds/OptionsFeed";
import { PollOptionsForm } from "@/components/forms/PollOptionsForm";
import { Icon, SafeAreaView, Text, View } from "@/components/ui";
import { usePolls } from "@/contexts/polls.context";
import { useColor } from "@/hooks/useColor";
import { Option } from "lucide-react-native";
import React, { Suspense } from "react";

export default function PollOptionsScreen() {
	const primary = useColor("primary");
	const { pollOptions } = usePolls();

	return (
		<SafeAreaView className="flex-1 p-3 gap-y-3">
			<View className="flex-row gap-x-2 items-center justify-center">
				<Icon name={Option} size={27} strokeWidth={4} color={primary} />
				<Text variant="heading" className="text-center text-primary">
					Poll Options
				</Text>
			</View>

			<View className="flex-1 justify-between ">
				<Suspense fallback={<OptionsFeed.Fallback />}>
					<OptionsFeed />
				</Suspense>

				<View className="gap-y-2">
					{pollOptions.length > 0 && (
						<Text variant="caption" className="text-center">
							Click option to edit
						</Text>
					)}
					<PollOptionsForm.SheetTrigger className="" />
				</View>
			</View>
		</SafeAreaView>
	);
}
