import { PollSchema } from "@/lib/schemas/poll.schema";
import { PollOptionSchema } from "@/lib/schemas/pollOption.schema";
import { addDaysAndToISO } from "@/lib/utils";
import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// export const usePollForm = ({default}: {default?: IPoll}) => //! fix types
export const usePollForm = ({ poll }: { poll?: IPoll }) =>
	useForm({
		resolver: zodResolver(PollSchema),
		// reValidateMode: "onBlur",
		defaultValues: {
			title: poll?.title || "",
			prompt: poll?.prompt || "",
			description: poll?.description || "",
			startDate: poll?.startDate || new Date().toISOString(),
			endDate: poll?.endDate || addDaysAndToISO(new Date(), 14),
			status: poll?.status || ePollStatus.DRAFT,
			tags: poll?.tags?.join(", ") || "",
			controls: {
				isPrivate: poll?.controls?.isPrivate || false,
				isMultipleChoice: poll?.controls?.isMultipleChoice || false,
				progressIsHidden: poll?.controls?.progressIsHidden || false,
				allowAnonymous: poll?.controls?.allowAnonymous || false,
				allowCustomResponse: poll?.controls?.allowCustomResponse || true,
				isEditable: poll?.controls?.isEditable || true,
				registrationIsRequired: poll?.controls?.registrationIsRequired || false,
				candidateIsAllowedToEditOption:
					poll?.controls?.candidateIsAllowedToEditOption || true,
				votesNumberIsLimited: poll?.controls?.votesNumberIsLimited || false,
				// maxVotes: z.coerce.number().optional(),
			},
			type: poll?.type || ePollType.SIMPLE,
		},
	});

export const usePollOptionForm = (opt?: IPollOption) =>
	useForm({
		resolver: zodResolver(PollOptionSchema),
		defaultValues: {
			name: opt?.name || "",
			description: opt?.description || "",
			order: opt?.order || 1,
			// thumbnail: "",
		},
	});
