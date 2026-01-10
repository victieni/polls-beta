import { PollSchema } from "@/lib/schemas/poll.schema";
import { PollOptionSchema } from "@/lib/schemas/pollOption.schema";
import { addDaysAndToISO } from "@/lib/utils";
import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// export const usePollForm = ({default}: {default?: IPoll}) => //! fix types
export const usePollForm = () =>
	useForm({
		resolver: zodResolver(PollSchema),
		// reValidateMode: "onBlur",
		defaultValues: {
			title: "",
			prompt: "",
			description: "",
			startDate: new Date().toISOString(),
			endDate: addDaysAndToISO(new Date(), 14),
			status: ePollStatus.DRAFT,
			tags: "",
			isEditable: true,
			isMultipleChoice: false,
			isPrivate: false,
			hideProgress: false,
			allowAnonymous: false,
			type: ePollType.SIMPLE,
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
