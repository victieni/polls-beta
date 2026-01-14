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
export const createVote = mutationOptions({
	mutationFn: async (data: IVote) => {
		try {
			return await payload.create({
				collection: "votes",
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess({ poll, option, voterHash }) {
		queryClient.invalidateQueries({
			queryKey: getVotes({ poll: poll.id, option: option.id }).queryKey,
		});
	},
});

export const updateVote = mutationOptions({
	mutationFn: async (data: IVote) => {
		try {
			return await payload.update({
				collection: "votes",
				id: data.id,
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess({ id, poll, option }) {
		queryClient.invalidateQueries({
			queryKey: [
				getVote(id).queryKey,
				getVotes({ poll: poll.id, option: option.id }),
			],
		});
	},
});

export const deleteVote = mutationOptions({
	mutationFn: async (id: string) => {
		try {
			return await payload.delete({
				collection: "votes",
				id,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess({ id, poll, option }) {
		queryClient.invalidateQueries({
			queryKey: [
				getVote(id).queryKey,
				getVotes({ poll: poll.id, option: option.id }),
			],
		});
	},
});

/**
 * @Queries
 */
export const getVotes = ({
	poll,
	option,
	isValid,
	voterHash,
}: {
	poll: string;
	option?: string;
	isValid?: boolean;
	voterHash?: string; // ? for multiple choice polls
}) =>
	infiniteQueryOptions({
		queryKey: ["votes", poll, option, voterHash],
		queryFn: async ({ pageParam: page }) => {
			try {
				const {
					docs: votes,
					hasNextPage,
					nextPage,
					totalDocs,
				} = await payload.find({
					collection: "votes",
					where: {
						poll: { equals: poll },
						or: [
							{ option: { equals: option } },
							{ isValid: { equals: isValid } },
							{ voterHash: { equals: voterHash } },
						],
					},
					page,
				});

				return { votes, hasNextPage, nextPage, count: totalDocs };
			} catch (error: any) {
				throw new Error(error);
			}
		},
		initialPageParam: 1,
		getNextPageParam: ({ nextPage }) => nextPage,
	});

export const getVote = (id: string) =>
	queryOptions({
		queryKey: ["vote", id],
		queryFn: async () => {
			try {
				return await payload.findByID({
					collection: "votes",
					id,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});
