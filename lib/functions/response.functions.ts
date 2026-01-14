import {
	infiniteQueryOptions,
	mutationOptions,
	queryOptions,
} from "@tanstack/react-query";
import { payload } from "../config/payload";
import { queryClient } from "../config/tanstackQuery";
/**
 * @Mutations
 */
export const createResponse = mutationOptions({
	mutationFn: async (data: IResponseCreate) => {
		try {
			return await payload.create({
				collection: "responses",
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess({ poll, userHash }) {
		queryClient.invalidateQueries({
			queryKey: getResponses({ poll: poll.id, userHash }).queryKey,
		});
	},
});

export const updateResponse = mutationOptions({
	mutationFn: async (data: IResponse) => {
		try {
			return await payload.update({
				collection: "responses",
				id: data.id,
				data,
			});
		} catch (error: any) {
			throw new error(error);
		}
	},
	onSuccess({ id, poll, userHash }) {
		queryClient.invalidateQueries({
			queryKey: [
				getResponses({ poll: poll.id, userHash }).queryKey,
				getResponse({ id }).queryFn,
			],
		});
	},
});

export const deleteResponse = mutationOptions({
	mutationFn: async (id: string) => {
		try {
			return await payload.delete({
				collection: "responses",
				id,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess({ id, poll, userHash }) {
		queryClient.invalidateQueries({
			queryKey: [
				getResponses({ poll: poll.id, userHash }).queryKey,
				getResponse({ id }).queryFn,
			],
		});
	},
});

/**
 * @Queries
 */
export const getResponses = ({
	poll,
	userHash,
}: {
	poll?: string;
	userHash?: string;
}) =>
	infiniteQueryOptions({
		queryKey: ["responses", poll, userHash],
		queryFn: async ({ pageParam: page }) => {
			try {
				const {
					docs: responses,
					hasNextPage,
					nextPage,
				} = await payload.find({
					collection: "responses",
					where: {
						or: [
							{ poll: { equals: poll } },
							{ userHash: { equals: userHash } }, // ? investigate on hashing
						],
					},
					page,
				});

				return { responses, hasNextPage, nextPage };
			} catch (error: any) {
				throw new Error(error);
			}
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});

export const getResponse = ({ id }: { id: string }) =>
	queryOptions({
		queryKey: ["response", id],
		queryFn: async () => {
			try {
				return await payload.findByID({
					collection: "responses",
					id,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});
