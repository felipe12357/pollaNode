-- CreateTable
CREATE TABLE "public"."Match" (
    "id" SERIAL NOT NULL,
    "team1" VARCHAR(20) NOT NULL,
    "team2" VARCHAR(20) NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "result" VARCHAR(7) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MatchForecast" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "MatchForecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "lastname" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MatchForecast" ADD CONSTRAINT "MatchForecast_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchForecast" ADD CONSTRAINT "MatchForecast_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
