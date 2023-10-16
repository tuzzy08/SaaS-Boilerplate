-- CreateEnum
CREATE TYPE "SubscriptionTypes" AS ENUM ('FREE', 'PREMIUM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Docs" (
    "id" TEXT NOT NULL,
    "doc_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "SubscriptionTypes" NOT NULL DEFAULT 'FREE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Docs_id_key" ON "Docs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_id_key" ON "Subscriptions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_user_id_key" ON "Subscriptions"("user_id");

-- AddForeignKey
ALTER TABLE "Docs" ADD CONSTRAINT "Docs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
