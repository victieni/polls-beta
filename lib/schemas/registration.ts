import { z } from "zod/v4";

export const registrationFormSchema = z.object({
	prompt: z.string().min(1, "Prompt is required"),
	description: z.string().optional(),
});

export type RegistrationFormDate = z.infer<typeof registrationFormSchema>;
