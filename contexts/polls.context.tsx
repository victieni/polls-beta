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
	admin?: IPollAdmin;
	registration?: IRegistration;

	setPoll: Dispatch<SetStateAction<IPoll | undefined>>;
	setPollOption: Dispatch<SetStateAction<IPollOption | undefined>>;
	setPollOptions: Dispatch<SetStateAction<IPollOption[]>>;
	setAdmin: Dispatch<SetStateAction<IPollAdmin | undefined>>;
	setRegistration: Dispatch<SetStateAction<IRegistration | undefined>>;
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
	const [admin, setAdmin] = useState<IPollAdmin>();
	const [registration, setRegistration] = useState<IRegistration>();

	const reset = () => {
		setPoll(undefined);
		setPollOption(undefined);
		setPollOptions([]);
		setAdmin(undefined);
		setRegistration(undefined);
	};

	const contextValue: Props = {
		poll,
		admin,
		reset,
		setPoll,
		setAdmin,
		pollOption,
		pollOptions,
		registration,
		setPollOption,
		setPollOptions,
		setRegistration,
	};

	return (
		<PollContext.Provider value={contextValue}>{children}</PollContext.Provider>
	);
};
