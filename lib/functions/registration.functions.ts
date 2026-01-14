import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { payload } from "../config/payload";
import { queryClient } from "../config/tanstackQuery";

/**
 * @Mutations
 */
export const createRegistration = mutationOptions({
	mutationFn: async (data: IRegistrationCreate) => {
		try {
			return await payload.create({
				collection: "registration",
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onError: (error) => {
		console.error(error);
	},
	onSuccess(data) {
		queryClient.invalidateQueries({
			queryKey: getRegistration(data.id).queryKey,
		});
	},
});

export const updateRegistration = mutationOptions({
	mutationFn: async (data: IRegistration) => {
		try {
			return await payload.update({
				collection: "registration",
				id: data.id,
				data,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess(data) {
		queryClient.invalidateQueries({
			queryKey: getRegistration(data.id).queryKey,
		});
	},
	onError: (error) => {
		console.error(error);
	},
});

export const deleteRegistration = mutationOptions({
	mutationFn: async (id: string) => {
		try {
			return await payload.delete({
				collection: "registration",
				id,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	},
	onSuccess(data) {
		queryClient.invalidateQueries({
			queryKey: getRegistration(data.id).queryKey,
		});
	},
	onError: (error) => {
		console.error(error);
	},
});

/**
 * @Queries
 */
export const getRegistration = (pollId: IPoll["id"]) =>
	queryOptions({
		queryKey: ["registration", pollId],
		queryFn: async () => {
			try {
				const {
					docs: [registration],
				} = await payload.find({
					collection: "registration",
					where: {
						poll: { equals: pollId },
					},
				});

				return registration;
			} catch (error: any) {
				throw new Error(error);
			}
		},
	});
