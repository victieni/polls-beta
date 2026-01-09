import {
	AuditLog,
	Config,
	Poll,
	PollOption,
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

	type IPollCreate = Omit<Poll, "id" | "createdAt" | "sizes" | "updatedAt"> &
		Partial<Pick<Poll, "id" | "createdAt" | "sizes" | "updatedAt">>;
}
