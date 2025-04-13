/*
  Warnings:

  - The `refreshToken` column on the `AuthRefreshToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AuthRefreshToken" DROP COLUMN "refreshToken",
ADD COLUMN     "refreshToken" TEXT[];
