import { hash } from "bcrypt";

export const _hash = async (txt: string) => {
	return await hash(txt, 13);
};
