import PollsFeed from "@/components/Feeds/PollsFeed";
import {
	SafeAreaView,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui";
import { ePollType } from "@/polls-backend/typescript/enum";
import { Suspense } from "react";

export default function PollsScreen() {
	return (
		<SafeAreaView className={"flex-1 px-3"}>
			<Tabs defaultValue="Fyp" className="flex-1">
				<TabsList className="w-fit justify-between">
					<TabsTrigger value="Fyp" className="flex-1">
						Fyp
					</TabsTrigger>
					<TabsTrigger value="Elections">Elections</TabsTrigger>
					<TabsTrigger value="Simple">Simple</TabsTrigger>
					<TabsTrigger value="Surveys">Surveys</TabsTrigger>
				</TabsList>

				<TabsContent value="Fyp" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed voidMsg="Polls coming soon..."   />
					</Suspense>
				</TabsContent>

				<TabsContent value="Elections" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed type={ePollType.ELECTION} />
					</Suspense>
				</TabsContent>

				<TabsContent value="Simple" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed type={ePollType.SIMPLE} />
					</Suspense>
				</TabsContent>

				<TabsContent value="Surveys" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed type={ePollType.SURVEY} />
					</Suspense>
				</TabsContent>
			</Tabs>
		</SafeAreaView>
	);
}
