-- CreateTable
CREATE TABLE "public"."Country" (
    "name" VARCHAR(50) NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "public"."Country"("name");
