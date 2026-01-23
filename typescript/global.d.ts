import {
	AuditLog,
	Config,
	Poll,
	PollOption,
	Registration,
	Response,
	User,
} from "@/polls-backend/typescript/payload";

export {};

declare global {
	type IUser = User;
	type IConfig = Config;
	type IPoll = Poll;
	type IPollOption = PollOption;
	type IVote = Vote;
	type IResults = Result;
	type IAuditLog = AuditLog;
	type IRegistration = Registration;
	type IResponse = Response;

	type IPollCreate = Omit<Poll, "id" | "createdAt" | "sizes" | "updatedAt"> &
		Partial<Pick<Poll, "id" | "createdAt" | "sizes" | "updatedAt">>;
	type IPollOptionCreate = Omit<
		PollOption,
		"id" | "createdAt" | "sizes" | "updatedAt"
	> &
		Partial<Pick<PollOption, "id" | "createdAt" | "sizes" | "updatedAt">>;
	type IRegistrationCreate = Omit<
		Registration,
		"id" | "createdAt" | "sizes" | "updatedAt"
	> &
		Partial<Pick<Registration, "id" | "createdAt" | "sizes" | "updatedAt">>;

	type IVoteCreate = Omit<Vote, "id" | "createdAt" | "sizes" | "updatedAt"> &
		Partial<Pick<Vote, "id" | "createdAt" | "sizes" | "updatedAt">>;

	type IResponseCreate = Omit<
		Response,
		"id" | "createdAt" | "sizes" | "updatedAt"
	> &
		Partial<Pick<Response, "id" | "createdAt" | "sizes" | "updatedAt">>;

	type IPollAdmin = NonNullable<IPoll["administration"]["admins"]>[number];

	interface IContext {
		reset: () => void;
	}
}
