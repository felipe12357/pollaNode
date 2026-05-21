/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `code` on the `Country` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.

*/
-- AlterTable
ALTER TABLE "public"."Country" DROP CONSTRAINT "Country_pkey",
ALTER COLUMN "code" SET DATA TYPE VARCHAR(3),
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("code");
