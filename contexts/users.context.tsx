import { UView } from "@/components/uniwind";
import {
	ComponentProps,
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface Props {
	users: IUser[];
	setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const UsersContext = createContext<null | Props>(null);

export const useUsers = () => {
	const context = useContext(UsersContext);

	if (!context) {
		throw new Error("Component should be child of '<UsersProvider />'");
	}
	return context;
};

export default function UsersProvider({
	usersInit,
	children,
	...props
}: { usersInit: IUser[] } & ComponentProps<typeof UView>) {
	const [users, setUsers] = useState<IUser[]>(usersInit);

	const contextValues: Props = { users, setUsers };

	return (
		<UsersContext.Provider value={contextValues}>
			<UView {...props}>{children}</UView>
		</UsersContext.Provider>
	);
}
