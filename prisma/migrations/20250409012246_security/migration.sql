/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ApiData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `ApiKeys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserColab` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "AuthRefreshToken" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiration" TEXT,
    "userColabId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthRefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthRefreshToken_id_key" ON "AuthRefreshToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthRefreshToken_userColabId_key" ON "AuthRefreshToken"("userColabId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiData_id_key" ON "ApiData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_id_key" ON "ApiKeys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Data_id_key" ON "Data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserColab_id_key" ON "UserColab"("id");

-- AddForeignKey
ALTER TABLE "AuthRefreshToken" ADD CONSTRAINT "AuthRefreshToken_userColabId_fkey" FOREIGN KEY ("userColabId") REFERENCES "UserColab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
