import { z } from "zod";

const todoValidation = z.object({
  title: z.string(),
  description: z
    .string()
    .max(256, { message: "Description can contain to 256 characters!" })
    .optional(),
  endTime: z.string().optional(),
});

export default todoValidation;
