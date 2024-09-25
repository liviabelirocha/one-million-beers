/*
  Warnings:

  - Made the column `userId` on table `GroupUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GroupUser" DROP CONSTRAINT "GroupUser_userId_fkey";

-- AlterTable
ALTER TABLE "GroupUser" ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Beer" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupUserId" TEXT NOT NULL,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beer" ADD CONSTRAINT "Beer_groupUserId_fkey" FOREIGN KEY ("groupUserId") REFERENCES "GroupUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
