import { getUser } from "@/lib/functions/user.functions";
import { useAuth } from "@clerk/clerk-expo";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
	const clerkId = useAuth().userId!;

	const { data: currentUser } = useSuspenseQuery(getUser(clerkId));

	return currentUser;
};
