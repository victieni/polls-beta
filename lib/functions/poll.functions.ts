import {
	infiniteQueryOptions,
	mutationOptions,
	queryOptions,
} from "@tanstack/react-query";
import { payload } from "../config/payload";
import { queryClient } from "../config/tanstackQuery";
import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";

/**
 * @mutations
 */
export const createPoll = mutationOptions({
	mutationFn: async (data: IPollCreate) => {
		try {
			return await payload.create({
				collection: "polls",
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess(data) {
		queryClient.invalidateQueries({
			queryKey: [getPoll(data.id).queryKey, getPolls({}).queryKey],
		});
	},
});

export const updatePoll = mutationOptions({
	mutationFn: async (data: IPoll) => {
		try {
			return await payload.update({
				collection: "polls",
				id: data.id,
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},

	onSuccess: (data) => {
		queryClient.invalidateQueries({
			queryKey: [getPoll(data.id).queryKey, getPolls({}).queryKey],
		});
	},
});

export const deletePoll = () =>
	mutationOptions({
		mutationFn: async (id: IPoll["id"]) => {
			try {
				return await payload.delete({
					collection: "polls",
					id,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [getPoll(data.id).queryKey, getPolls({}).queryKey],
			});
		},
	});

/**
 * @Queries
 */

export const getPoll = (id: IPoll["id"]) =>
	queryOptions({
		queryKey: ["poll", id],
		queryFn: async () => {
			try {
				return await payload.findByID({
					collection: "polls",
					id,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});

export const getPolls = ({
	isPrivate,
	anonymous,
	isEditable,
	status,
	type,
	creator,
	bookmark,
}: {
	isPrivate?: boolean;
	anonymous?: boolean;
	isEditable?: boolean;
	status?: ePollStatus;
	type?: ePollType;
	creator?: string;
	bookmark?: string;
}) =>
	infiniteQueryOptions({
		queryKey: ["polls", isPrivate, anonymous, isEditable, status, type],
		initialPageParam: 0,
		queryFn: async ({ pageParam: page }) => {
			try {
				console.log("Page:", page);
				console.log(
					"params:",
					isPrivate,
					anonymous,
					isEditable,
					status,
					type,
					creator,
					bookmark
				);

				const {
					docs: polls,
					hasNextPage,
					nextPage,
				} = await payload.find({
					collection: "polls",
					where: {
						or: [
							{ isPrivate: { equals: isPrivate } },
							{ isEditable: { equals: isEditable } },
							{ status: { equals: status } },
							{ type: { equals: type } },
							{ anonymous: { equals: anonymous } },
							{ "administration.creator": { equals: creator } },
							{ "meta.bookmarks": { contains: bookmark } },
						],
					},
					page,
				});

				console.log("results:", polls, nextPage);

				return { polls, hasNextPage, nextPage: nextPage ?? page };
			} catch (error: any) {
				throw new Error(error);
			}
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});

export const _getPolls = ({
	isPrivate,
	anonymous,
	isEditable,
	status,
	type,
	creator,
	bookmark,
}: {
	isPrivate?: boolean;
	anonymous?: boolean;
	isEditable?: boolean;
	status?: ePollStatus;
	type?: ePollType;
	creator?: string;
	bookmark?: string;
}) =>
	queryOptions({
		queryKey: ["polls", isPrivate, anonymous, isEditable, status, type],
		queryFn: async () => {
			try {
				console.log(
					"params:",
					isPrivate,
					anonymous,
					isEditable,
					status,
					type,
					creator,
					bookmark
				);

				const {
					docs: polls,
					hasNextPage,
					nextPage,
				} = await payload.find({
					collection: "polls",
					where: {
						or: [
							{ isPrivate: { equals: isPrivate } },
							{ isEditable: { equals: isEditable } },
							{ status: { equals: status } },
							{ type: { equals: type } },
							{ anonymous: { equals: anonymous } },
							{ "administration.creator": { equals: creator } },
							{ "meta.bookmarks": { contains: bookmark } },
						],
					},
				});

				return { polls, hasNextPage, nextPage };
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});
