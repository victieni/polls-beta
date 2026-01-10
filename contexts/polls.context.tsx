import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface Props extends IContext {
	poll?: IPoll;
	editPoll?: IPoll;
	newPoll?: IPoll;
	pollOptions: IPollOption[];

	setPoll: Dispatch<SetStateAction<IPoll | undefined>>;
	setEditPoll: Dispatch<SetStateAction<IPoll | undefined>>;
	setNewPoll: Dispatch<SetStateAction<IPoll | undefined>>;
	setPollOptions: Dispatch<SetStateAction<IPollOption[]>>;
}

const PollContext = createContext<null | Props>(null);

export const usePolls = () => {
	const context = useContext(PollContext);

	if (!context) throw new Error("Element must be descendant of PollsProvider");

	return context;
};

export const PollsProvider = ({ children }: { children: ReactNode }) => {
	const [poll, setPoll] = useState<IPoll>();
	const [editPoll, setEditPoll] = useState<IPoll>();
	const [newPoll, setNewPoll] = useState<IPoll>();
	const [pollOptions, setPollOptions] = useState<IPollOption[]>([]);

	const reset = () => {
		setPoll(undefined);
		setEditPoll(undefined);
		setNewPoll(undefined);
		setPollOptions([]);
	};

	const contextValue: Props = {
		poll,
		setPoll,
		pollOptions,
		setPollOptions,
		editPoll,
		setEditPoll,
		newPoll,
		setNewPoll,
		reset,
	};

	return (
		<PollContext.Provider value={contextValue}>{children}</PollContext.Provider>
	);
};
