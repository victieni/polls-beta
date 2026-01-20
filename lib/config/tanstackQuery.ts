import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError(error) {
			// ! test
			console.error(error);
		},
	}),
	// queryCache: new QueryCache({
	// 	onError(error) {
	// 		// ! test
	// 		console.error(error);
	// 	},
	// }),
});
