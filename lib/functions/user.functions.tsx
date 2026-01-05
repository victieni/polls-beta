import { queryOptions } from "@tanstack/react-query";
import { getPayload } from "../payload";

const payload = getPayload();

/**
 * @Queries
 */

export const getUsers = () =>
	queryOptions({
		queryKey: ["users"],
		queryFn: async () => {
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
		},
	});
