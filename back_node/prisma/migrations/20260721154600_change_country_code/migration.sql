/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Country" DROP CONSTRAINT "Country_pkey",
ALTER COLUMN "code" SET DATA TYPE VARCHAR(7),
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("code");
