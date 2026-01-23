import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const adminPermissionsFormSchema = z.object({
	updatePolls: z.boolean().default(false),
	updateControls: z.boolean().default(true),
	updateOptions: z.boolean().default(false),
	updateRegistration: z.boolean().default(false),
	verifyVoters: z.boolean().default(true),
});

export type adminPermissionsFormData = z.infer<
	typeof adminPermissionsFormSchema
>;

export const useAdminPermissionsForm = (
	permissions: IPollAdmin["permissions"]
) =>
	useForm({
		resolver: zodResolver(adminPermissionsFormSchema),
		defaultValues: {
			updatePolls: permissions ? permissions.updatePolls! : false,
			updateControls: permissions ? permissions.updateControls! : true,
			updateOptions: permissions ? permissions.updateOptions! : false,
			updateRegistration: permissions ? permissions.updateRegistration! : false,
			verifyVoters: permissions ? permissions.verifyVoters! : true,
		},
	});
