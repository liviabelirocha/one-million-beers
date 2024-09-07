import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const findOrCreateUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await findUserByUsername(username);

  if (user) return user;

  const newUser = await db.user.create({
    data: {
      username,
      password,
    },
  });

  return newUser;
};

export const findUserByUsername = async (username: string) =>
  db.user.findUnique({ where: { username } });
