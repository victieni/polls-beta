import { PayloadSDK } from "@payloadcms/sdk";

export const payload = new PayloadSDK<IConfig>({
	baseURL: process.env.EXPO_PUBLIC_API || "http://localhost:3000/api",
});
