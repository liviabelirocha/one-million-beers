import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const createGroup = async ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) =>
  db.group.create({
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

export const joinGroup = async (params: {
  groupId: string;
  userId: string;
}) => {
  const userInGroup = await findUserInGroup(params);

  if (userInGroup) return userInGroup;

  return db.groupUser.create({
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

export const listGroups = async (userId: string) =>
  db.group.findMany({
    where: {
      users: { some: { userId } },
    },
  });

export const listUsersInGroup = async (groupId: string) =>
  db.groupUser.findMany({
    where: {
      groupId: groupId,
    },
    include: {
      user: true,
    },
  });
