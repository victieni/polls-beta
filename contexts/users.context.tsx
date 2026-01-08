import { View } from "@/components/ui";
import { getInfiniteUsers } from "@/lib/functions/user.functions";
import {
	useSuspenseInfiniteQuery,
	UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import { ComponentProps, createContext, useContext } from "react";

type Props = UseSuspenseInfiniteQueryResult<IUser[], Error> & {
	// users: IUser[];
	// setUsers: Dispatch<SetStateAction<IUser[]>>;
};

const UsersContext = createContext<Props | null>(null);

export const useUsers = () => {
	const context = useContext(UsersContext);

	if (!context) {
		throw new Error("Component should be child of '<UsersProvider />'");
	}
	return context;
};

export default function UsersProvider({
	children,
	...props
}: {} & ComponentProps<typeof View>) {
	// const [users, setUsers] = useState<IUser[]>(usersInit);
	const contextValues = useSuspenseInfiniteQuery({
		...getInfiniteUsers({}),
		select: (d) => d.pages.flatMap((d) => d.users),
	});

	const fetchNextPage = contextValues.fetchNextPage;

	// const contextValues: Props = { users, ...results };

	return (
		<UsersContext.Provider value={contextValues}>
			<View {...props}>{children}</View>
		</UsersContext.Provider>
	);
}
