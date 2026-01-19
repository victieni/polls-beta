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

				{/* <PollsSuspenseBoundary>
					<TabsContent value="Fyp" className="h-screen">
						<PollsFeed />
					</TabsContent>

					<TabsContent value="Elections" className="h-screen">
						<PollsFeed type={ePollType.ELECTION} />
					</TabsContent>

					<TabsContent value="Simple" className="h-screen">
						<PollsFeed type={ePollType.SIMPLE} />
					</TabsContent>

					<TabsContent value="Surveys" className="h-screen">
						<PollsFeed type={ePollType.SURVEY} />
					</TabsContent>
				</PollsSuspenseBoundary> */}

				<TabsContent value="Fyp" className="h-screen">
					<Suspense fallback={<PollsFeed.Fallback />}>
						<PollsFeed />
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
