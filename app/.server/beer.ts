import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const addBeer = (data: { amount: number; groupUserId: string }) =>
  db.beer.create({
    data,
  });

export const beersInGroup = (groupId: string) =>
  db.beer.aggregate({
    where: {
      groupUser: {
        groupId,
      },
    },
    _sum: { amount: true },
  });

type BeersInGroupPerPersonType = {
  total_amount: number;
  username: string;
  id: string;
}[];

export const beersInGroupPerPerson = (groupId: string) =>
  db.$queryRaw<BeersInGroupPerPersonType>`SELECT SUM(b.amount) AS total_amount, u.username, gu.id 
               FROM "Beer" AS b 
               INNER JOIN "GroupUser" AS gu ON b."groupUserId" = gu."id"
               INNER JOIN "User" AS u ON u."id" = gu."userId"
               WHERE gu."groupId" = ${groupId}
               GROUP BY u.username, gu.id`;

type BeersInGroupPerMonthType = {
  total_amount: number;
  date: string;
}[];

export const beersInGroupPerMonth = (groupId: string) =>
  db.$queryRaw<BeersInGroupPerMonthType>`SELECT SUM(b.amount) AS total_amount, TO_CHAR(b."createdAt", 'MM-YYYY') AS date 
               FROM "Beer" AS b
               INNER JOIN "GroupUser" AS gu ON b."groupUserId" = gu."id"
               WHERE gu."groupId" = ${groupId}
               GROUP BY TO_CHAR(b."createdAt", 'MM-YYYY')`;
