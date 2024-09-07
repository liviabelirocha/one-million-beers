import { z } from "zod";

export function parseZod<T extends z.ZodTypeAny>(
  schema: T,
  data: FormData
):
  | {
      errors: {
        [key in keyof Partial<z.infer<T>>]: string[];
      };
      data?: never;
    }
  | {
      errors?: never;
      data: z.infer<T>;
    } {
  const validatedFields = schema.safeParse(Object.fromEntries(data.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as {
        [key in keyof z.infer<T>]: string[];
      },
    };
  }

  return { data: validatedFields.data };
}
