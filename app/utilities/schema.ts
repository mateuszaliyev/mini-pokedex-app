import * as z from "zod";

export const nullishToUndefined = <TSchema extends z.ZodType>(
  schema: TSchema,
) =>
  schema
    .nullish()
    .transform((value) => value ?? undefined)
    .catch(undefined);
