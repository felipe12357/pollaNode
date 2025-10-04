-- AlterTable
ALTER TABLE "public"."Match" ALTER COLUMN "result" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL;
