import { z } from "zod";

export const PollOptionSchema = z.object({
	// Basic fields
	name: z
		.string()
		.min(1, "Name is required")
		.max(200, "Name must be less than 200 characters"),

	description: z
		.string()
		.max(500, "Description must be less than 500 characters")
		.optional(),

	// Ordering
	order: z.coerce.number().min(1, "Order cannot be negative").default(1),
});

// Schema for creating a new poll option
export const CreatePollOptionSchema = PollOptionSchema;

// Schema for updating a poll option (all fields optional)
export const UpdatePollOptionSchema = PollOptionSchema.partial();

// Schema for bulk operations
export const BulkPollOptionSchema = z.object({
	pollOptions: z
		.array(PollOptionSchema)
		.min(1, "At least one poll option is required")
		.max(100, "Maximum 100 poll options allowed"),
});

// TypeScript types
export type PollOptionFormData = z.infer<typeof PollOptionSchema>;
export type CreatePollOptionInputFormData = z.infer<
	typeof CreatePollOptionSchema
>;
export type UpdatePollOptionInputFormData = z.infer<
	typeof UpdatePollOptionSchema
>;
export type BulkPollOptionInputFormData = z.infer<typeof BulkPollOptionSchema>;
