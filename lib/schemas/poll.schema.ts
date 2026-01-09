import { ePollStatus, ePollType } from "@/polls-backend/typescript/enum";
import { z } from "zod";

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

		// status: z.enum(["draft", "published", "archived"]).default("draft"),
		status: z.enum(ePollStatus).default(ePollStatus.DRAFT),
		type: z.enum(ePollType).default(ePollType.SIMPLE),

		hideProgress: z.boolean().default(false),
		isPrivate: z.boolean().default(false),
		isEditable: z.boolean().default(true),
		isMultipleChoice: z.boolean().default(false),
		allowAnonymous: z.boolean().default(false),

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
