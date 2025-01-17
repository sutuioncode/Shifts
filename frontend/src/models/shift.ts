import { z } from "zod";

export const ShiftSchema = z.object({
    id: z.number(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format. Use HH:mm.",
    }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format. Use HH:mm.",
    }),
    startDate: z.string().datetime({ message: "Invalid date format. Use ISO 8601." }),
    endDate: z.string().datetime({ message: "Invalid date format. Use ISO 8601." }),
    ShiftDayOfWeek: z
        .array(
            z.enum([
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ])
        )
        .nonempty({ message: "ShiftDayOfWeek must have at least one day." }),
    repeatCicleIn: z.enum(["week", "month"], {
        message: "repeatCicleIn must be either 'weeks' or 'months'.",
    }),
    repeatCount: z.number().int().positive({ message: "repeatCount must be a positive integer." }),
    employeeId: z.number().int().positive({ message: "employeeId must be a positive integer." }),
    employeeName: z.string().min(1, { message: "employeeName cannot be empty." }),
});

export const CreateShiftSchema = ShiftSchema.omit({ id: true })
export type Shift = z.infer<typeof ShiftSchema>
export type CreateShift = z.infer<typeof CreateShiftSchema>