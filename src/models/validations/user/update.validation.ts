import { z } from "zod";

const updateValidation = z.object({
  name: z.string().min(2, { message: "Must be 2 or more charcters!" }),
  email: z.string().email({ message: "Enter valid email value!" }),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,16}$/, {
    message:
      "Must contain 1 number, 1 special sign, 1 capital letter and be 6-16 characters",
  }),
});

export default updateValidation;
