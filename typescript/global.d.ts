import { User } from "./payload";

export {};

declare global {
	type IUser = User;
}
