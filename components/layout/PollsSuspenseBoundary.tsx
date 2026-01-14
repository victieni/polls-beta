import React, { ReactNode, Suspense } from "react";
import { ScrollView, Skeleton, View } from "../ui";
import { PollCard } from "../cards/PollCard";

export default function PollsSuspenseBoundary({
	children,
}: {
	children: ReactNode;
}) {
	return <Suspense fallback={<Fallback />}>{children}</Suspense>;
}

const Fallback = () => (
	<View className="gap-y-3">
		<Skeleton className="h-12" />

		<ScrollView>
			{[...Array(7)].map((_, i) => (
				<PollCard.Skeleton key={i} className="mb-2" />
			))}
		</ScrollView>
	</View>
);
