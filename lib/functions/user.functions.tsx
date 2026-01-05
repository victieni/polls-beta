import { getPayload } from "../payload";

const payload = getPayload();

export const getUsers = async () => {
	try {
		const {
			docs: users,
			hasNextPage,
			nextPage,
		} = await payload.find({
			collection: "users",
		});

		return { users, hasNextPage, nextPage };
	} catch (error: any) {
		throw new Error(error);
	}
};
