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

export const createUser = (data: IUser) =>
	mutationOptions({
		mutationFn: async () => {
			try {
				await payload.create({
					collection: "users",
					data,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: getUsers({}).queryKey,
			});
		},
	});

export const updateUser = (data: IUser) =>
	mutationOptions({
		mutationFn: async () => {
			try {
				await payload.update({
					collection: "users",
					id: data.id,
					data,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getUser(data.clerkId).queryKey, getUsers({}).queryKey],
			});
		},
	});

/**
 * @Queries
 */

export const getUsers = ({ page, limit }: { page?: number; limit?: number }) =>
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
					page,
					limit,
				});

				return { users, hasNextPage, nextPage };
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});

export const getInfiniteUsers = ({ limit }: { limit?: number }) =>
	infiniteQueryOptions({
		queryKey: ["users"],
		queryFn: async ({ pageParam: page }) => {
			try {
				const {
					docs: users,
					hasNextPage,
					nextPage,
				} = await payload.find({
					collection: "users",
					page,
					limit,
				});

				return { users, hasNextPage, nextPage };
			} catch (error: any) {
				throw new Error(error);
			}
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});

export const getUser = (clerkId: IUser["clerkId"]) =>
	queryOptions({
		queryKey: ["users", clerkId],
		queryFn: async () => {
			try {
				return await payload.find({
					collection: "users",
					where: {
						clerkId: { equals: clerkId },
					},
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});

export const getCurrentUser = () =>
	queryOptions({
		queryKey: ["user", "currentUser"],
		queryFn: async () => {
			const id = "661a3b4c5e6f7a8b9c0d1e34";
			return payload.findByID({
				collection: "users",
				id,
			});
		},
	});
