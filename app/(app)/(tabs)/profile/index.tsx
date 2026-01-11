import { SignOutButton } from "@/components/btns/signoutBtn";
import PollsFeed from "@/components/Feeds/PollsFeed";
import {
	Button,
	Icon,
	Link,
	SafeAreaView,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Text,
	View,
} from "@/components/ui";
import { useColor } from "@/hooks/useColor";
import { Settings, UserCircle } from "lucide-react-native";
import React, { Suspense } from "react";

export default function ProfileScreen() {
	const primary = useColor("primary");

	return (
		<SafeAreaView className="flex-1 p-3">
			<View className="flex-row justify-between gap-x-3">
				<View className="flex-row gap-x-2 items-center justify-between">
					<View className="flex-row items-center gap-x-1">
						<Icon name={UserCircle} size={30} color={primary} />
						<Text variant="heading" className="text-primary">
							Profile
						</Text>
					</View>
				</View>

				<Link href="/profile/settings" asChild>
					<Button icon={Settings} size="icon" variant="outline" />
				</Link>
			</View>

			<SignOutButton />

			<Tabs defaultValue="Polls" className="flex-1">
				<TabsList>
					<TabsTrigger value="Polls">Polls</TabsTrigger>
					<TabsTrigger value="Bookmarks">Bookmarks</TabsTrigger>
					<TabsTrigger value="Following">Following</TabsTrigger>
					<TabsTrigger value="Participated">Participated</TabsTrigger>
				</TabsList>

				<TabsContent value="Polls" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed creator={"661a3b4c5e6f7a8b9c0d1e33"} />
					</Suspense>
				</TabsContent>

				<TabsContent value="Bookmarks" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed bookmark={"661a3b4c5e6f7a8b9c0d1e33"} />
					</Suspense>
				</TabsContent>
				<TabsContent value="Following" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed follower={"661a3b4c5e6f7a8b9c0d1e33"} />
					</Suspense>
				</TabsContent>
				<TabsContent value="Participated" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed />
					</Suspense>
				</TabsContent>
			</Tabs>
		</SafeAreaView>
	);
}
