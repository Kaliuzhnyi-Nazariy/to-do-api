import { z } from "zod";

const todoStatusValidation = z.object({
  status: z.enum(["todo", "progress", "done"]),
});

export default todoStatusValidation;
