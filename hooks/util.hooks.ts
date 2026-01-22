import { getUser } from "@/lib/functions/user.functions";
import { useAuth } from "@clerk/clerk-expo";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useResolveClassNames } from "uniwind";

export const useCurrentUser = () => {
	const clerkId = useAuth().userId!;

	const { data: currentUser } = useSuspenseQuery(getUser(clerkId));

	return currentUser;
};

export const usePollAdmin = (poll: IPoll) => {
	const currentUser = useCurrentUser();

	const admin = poll.administration.admins?.find(
		(a) => a.user.id === currentUser.id
	);

	const isCreator = currentUser.id === poll.administration.creator.id;

	return { isAdmin: !!admin, isCreator, admin };
};

// export const useClassNames = () => {
// 	const x = useResolveClassNames("")

// return () => {}
// }