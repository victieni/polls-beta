import { View } from "@/components/ui";
import { getInfiniteUsers } from "@/lib/functions/user.functions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ComponentProps, createContext, useContext, useState } from "react";

interface Props {
	currentUser: IUser;
}

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
	currentUserInit,
	...props
}: { currentUserInit: IUser } & ComponentProps<typeof View>) {
	const [currentUser, setCurrentUser] = useState<IUser>(currentUserInit);

	const contextValues: Props = { currentUser };

	// const contextValues: Props = { users, ...results };

	return (
		<UsersContext.Provider value={contextValues}>
			<View {...props}>{children}</View>
		</UsersContext.Provider>
	);
}
