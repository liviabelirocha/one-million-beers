// app/services/auth.server.ts
import { User as DbUser } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { findOrCreateUser, findUserByUsername } from "~/.server/user";
import { parseZod, ValidationError } from "~/utils";
import { sessionStorage } from "./session.server";
import { signIn } from "./validations";

export const authenticator = new Authenticator<DbUser>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const { errors, data } = parseZod(signIn, form);

    if (errors) throw new ValidationError("Invalid form data", errors);

    const user = await findUserByUsername(data.username);

    if (!user) throw new Error("User not found");

    const isPasswordMatching = await compare(data.password, user.password);

    if (!isPasswordMatching)
      throw new ValidationError("Invalid password", {
        password: ["Invalid password"],
      });

    return user;
  }),
  "user-sign-in"
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const { errors, data } = parseZod(signIn, form);

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

    return user;
  }),
  "user-sign-up"
);
