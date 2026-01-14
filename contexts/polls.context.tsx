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
	pollOption?: IPollOption;
	pollOptions: IPollOption[];

	setPoll: Dispatch<SetStateAction<IPoll | undefined>>;
	setPollOption: Dispatch<SetStateAction<IPollOption | undefined>>;
	setPollOptions: Dispatch<SetStateAction<IPollOption[]>>;
}

const PollContext = createContext<null | Props>(null);

export const usePolls = () => {
	const context = useContext(PollContext);

	if (!context) throw new Error("Element must be descendant of PollsProvider");

	return context;
};

export const PollsProvider = ({
	children,
	initPoll,
}: {
	children: ReactNode;
	initPoll?: IPoll;
}) => {
	const [poll, setPoll] = useState<IPoll | undefined>(initPoll);
	const [pollOption, setPollOption] = useState<IPollOption>();
	const [pollOptions, setPollOptions] = useState<IPollOption[]>([]);

	const reset = () => {
		setPoll(undefined);
		setPollOption(undefined);
		setPollOptions([]);
	};

	const contextValue: Props = {
		poll,
		reset,
		setPoll,
		pollOption,
		pollOptions,
		setPollOption,
		setPollOptions,
	};

	return (
		<PollContext.Provider value={contextValue}>{children}</PollContext.Provider>
	);
};
