/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `ApiKeys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apiKeySecret]` on the table `ApiKeys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bearerToken]` on the table `ApiKeys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accessToken]` on the table `ApiKeys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accessTokenSecret]` on the table `ApiKeys` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserColab" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_apiKey_key" ON "ApiKeys"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_apiKeySecret_key" ON "ApiKeys"("apiKeySecret");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_bearerToken_key" ON "ApiKeys"("bearerToken");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_accessToken_key" ON "ApiKeys"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_accessTokenSecret_key" ON "ApiKeys"("accessTokenSecret");
