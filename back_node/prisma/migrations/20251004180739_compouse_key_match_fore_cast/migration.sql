/*
  Warnings:

  - The primary key for the `MatchForecast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MatchForecast` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,matchId]` on the table `MatchForecast` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."MatchForecast" DROP CONSTRAINT "MatchForecast_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "MatchForecast_userId_matchId_key" ON "public"."MatchForecast"("userId", "matchId");
