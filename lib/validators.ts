import { z } from "zod";

export const dateRangeSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export const recipientEmailSchema = z
  .string()
  .email("Must be a valid email address");

export const companyIdSchema = z
  .string()
  .uuid("Must be a valid UUID")
  .or(z.literal(""));

export const settingsPatchSchema = z.object({
  report_email: z.string().email().optional().or(z.literal("")),
  timezone: z.string().optional(),
  reports_enabled: z.boolean().optional(),
  display_name: z.string().max(80).optional(),
});

export type SettingsPatch = z.infer<typeof settingsPatchSchema>;
