/* eslint-disable @typescript-eslint/no-unused-vars */
import { User as DbUser } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { z } from "zod";
import { findOrCreateUser, findUserByUsername } from "~/.server/user";
import { parseZod, ValidationError } from "~/utils";
import { sessionStorage } from "./session.server";

export type User = Omit<DbUser, "password">;

export const authenticator = new Authenticator<User>(sessionStorage);

const signInValidation = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3),
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const { errors, data } = parseZod(signInValidation, form);

    if (errors) throw new ValidationError("Invalid form data", errors);

    const user = await findUserByUsername(data.username);

    if (!user) throw new Error("User not found");

    const isPasswordMatching = await compare(data.password, user.password);

    if (!isPasswordMatching)
      throw new ValidationError("Invalid password", {
        password: ["Invalid password"],
      });

    const { password, ...rest } = user;

    return rest;
  }),
  "user-sign-in"
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const { errors, data } = parseZod(signInValidation, form);

    if (errors) throw new ValidationError("Invalid form data", errors);

    const hashedPassword = await hash(data.password, 12);

    const user = await findOrCreateUser({
      username: data.username,
      password: hashedPassword,
    });

    const isPasswordMatching = await compare(data.password, user.password);

    if (!isPasswordMatching)
      throw new ValidationError("Invalid password", {
        password: ["Invalid password"],
      });

    const { password, ...rest } = user;

    return rest;
  }),
  "user-sign-up"
);
