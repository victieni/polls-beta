import { Config, User } from "@/polls-backend/typescript/payload";

export {};

declare global {
	type IUser = User;
	type IConfig = Config;
}
