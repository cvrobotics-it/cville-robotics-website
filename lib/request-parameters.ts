import { z } from "zod";

export const teamKeySchema = z.string().regex(/^frc[1-9]\d{0,5}$/);
export const eventKeySchema = z.string().regex(/^\d{4}[a-z0-9_-]{1,64}$/i);
export const competitionYearSchema = z
  .string()
  .regex(/^\d{4}$/)
  .transform(Number)
  .pipe(
    z
      .number()
      .int()
      .min(1992)
      .max(new Date().getFullYear() + 1),
  );

export const teamEventsParametersSchema = z.object({
  team: teamKeySchema,
  year: competitionYearSchema.optional(),
});

export const teamEventParametersSchema = z.object({
  team: teamKeySchema,
  eventKey: eventKeySchema,
});

export const seasonDetailsParametersSchema = z.object({
  team: teamKeySchema,
  years: z
    .array(competitionYearSchema)
    .min(1)
    .max(40)
    .transform((years) => [...new Set(years)]),
});
