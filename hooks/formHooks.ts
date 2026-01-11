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
			isEditable: poll?.isEditable || true,
			isMultipleChoice: poll?.isMultipleChoice || false,
			isPrivate: poll?.isPrivate || false,
			hideProgress: poll?.hideProgress || false,
			allowAnonymous: poll?.allowAnonymous || false,
			type: poll?.type || ePollType.SIMPLE,
		},
	});

export const usePollOptionForm = () =>
	useForm({
		resolver: zodResolver(PollOptionSchema),
		defaultValues: {
			name: "",
			description: "",
			order: 0,
			thumbnail: "",
		},
	});
