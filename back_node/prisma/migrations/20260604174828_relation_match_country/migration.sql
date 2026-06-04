-- AlterTable
ALTER TABLE "public"."Match" ALTER COLUMN "team1" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team1_fkey" FOREIGN KEY ("team1") REFERENCES "public"."Country"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_team2_fkey" FOREIGN KEY ("team2") REFERENCES "public"."Country"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
