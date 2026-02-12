/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(510);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");
