import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const create = async ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) => {
  await db.group.create({
    data: {
      name: name,
      users: {
        create: [
          {
            userId,
          },
        ],
      },
    },
  });
};

export const addUser = async (params: { groupId: string; userId: string }) => {
  await db.groupUser.create({
    data: params,
  });
};

export const findUserInGroup = async (params: {
  groupId: string;
  userId: string;
}) => {
  const group = await db.groupUser.findFirst({
    where: params,
    include: {
      user: true,
      group: true,
    },
  });

  return group;
};

export const list = async (userId: string) => {
  return db.group.findMany({
    where: {
      users: { some: { userId } },
    },
  });
};
