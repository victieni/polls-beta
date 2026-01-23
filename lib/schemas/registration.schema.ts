import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

export const registrationFormSchema = z.object({
	prompt: z.string().min(1, "Prompt is required"),
	description: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export const useRegistrationConfigForm = (registration?: IRegistration) =>
	useForm({
		resolver: zodResolver(registrationFormSchema),
		defaultValues: {
			prompt: registration?.prompt || "",
			description: registration?.description || "",
		},
	});
