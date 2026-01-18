import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";
import { z } from "zod";

export const PollControlsSchema = z.object({
	// Control fields
	isPrivate: z.boolean().default(false),
	isMultipleChoice: z.boolean().default(false),
	progressIsHidden: z.boolean().default(false),
	allowAnonymous: z.boolean().default(false),
	allowCustomResponse: z.boolean().default(true),
	isEditable: z.boolean().default(true),
	registrationIsRequired: z.boolean().default(false),
	candidateIsAllowedToEditOption: z.boolean().default(true),
	votesNumberIsLimited: z.boolean().default(false),
	maxVotes: z.coerce.number().optional(),
});

export const adminFormSchema = z.object({
	user: z.string().min(1, "Please select admin user"),
	permissions: z.object({
		updatePolls: z.boolean().default(false),
		updateControls: z.boolean().default(true),
		updateOptions: z.boolean().default(false),
		updateRegistration: z.boolean().default(false),
		verifyVoters: z.boolean().default(true),
	}),
});

export const PollSchema = z
	.object({
		title: z
			.string()
			.min(1, "Title is required")
			.max(200, "Title must be less than 200 characters"),

		prompt: z
			.string()
			.min(1, "Prompt is required")
			.max(500, "Prompt must be less than 1000 characters"),
		description: z
			.string()
			.max(500, "Description must be less than 3000 characters")
			.optional(),

		controls: PollControlsSchema,

		// status: z.enum(["draft", "published", "archived"]).default("draft"),
		status: z.enum(ePollStatus).default(ePollStatus.DRAFT),
		type: z.enum(ePollType).default(ePollType.SIMPLE),

		startDate: z
			.string()
			.datetime({ message: "Invalid date format" })
			.optional(),
		endDate: z.string().datetime({ message: "Invalid date format" }).optional(),

		// For categories/tags
		tags: z.string().optional(),
	})
	.refine(
		(data) => {
			// Custom validation for end date after start date
			if (data.startDate && data.endDate) {
				return new Date(data.endDate) > new Date(data.startDate);
			}
			return true;
		},
		{
			message: "End date must be after start date",
			path: ["endDate"],
		}
	);

// TypeScript types derived from schemas
export type PollFormData = z.infer<typeof PollSchema>;
export type PollControlsFormData = z.infer<typeof PollControlsSchema>;
export type AdminFormData = z.infer<typeof adminFormSchema>;
