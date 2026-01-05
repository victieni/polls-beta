import { PayloadSDK } from "@payloadcms/sdk";
import type { Config } from "../typescript/payload";

export const getPayload = () =>
	new PayloadSDK<Config>({
		// baseURL: process.env.EXPO_PUBLIC_API || "http://localhost:3000/api",
		baseURL: "http://localhost:3000/api",
	});
