import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { payload } from "../config/payload";
import { queryClient } from "../config/tanstackQuery";

/**
 * @Mutations
 */
export const createPollOption = mutationOptions({
	mutationFn: async (data: IPollOptionCreate) => {
		try {
			return await payload.create({
				collection: "poll-options",
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess(value, variables, onMutateResult, context) {
		queryClient.invalidateQueries({
			queryKey: [getPollOptions(value.poll.id).queryKey],
		});
	},
	onError: (error) => {
		console.log(error);
	},
});

export const updatePollOption = mutationOptions({
	mutationFn: async (data: IPollOption) => {
		try {
			return await payload.update({
				collection: "poll-options",
				id: data.id,
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess(value, variables, onMutateResult, context) {
		queryClient.invalidateQueries({
			queryKey: [
				getPollOptions(value.poll.id).queryKey,
				getPollOption(value.id).queryKey,
			],
		});
	},
	onError: (error) => {
		console.log(error);
	},
});

export const deletePollOption = mutationOptions({
	mutationFn: async (id: string) => {
		try {
			return await payload.delete({
				collection: "poll-options",
				id,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess(value, variables, onMutateResult, context) {
		queryClient.invalidateQueries({
			queryKey: [
				getPollOptions(value.poll.id).queryKey,
				getPollOption(value.id).queryKey,
			],
		});
	},
	onError: (error) => {
		console.log(error);
	},
});

/**
 * @Queries
 */
export const getPollOptions = (pollId: IPoll["id"]) =>
	queryOptions({
		queryKey: ["pollOption", pollId],
		queryFn: async () => {
			try {
				const { docs: options } = await payload.find({
					collection: "poll-options",
					where: {
						poll: { equals: pollId },
					},
				});

				return options;
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});

export const getPollOption = (id: IPollOption["id"]) =>
	queryOptions({
		queryKey: ["PollOption", id],
		queryFn: async () => {
			try {
				return await payload.findByID({
					collection: "poll-options",
					id,
				});
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});
