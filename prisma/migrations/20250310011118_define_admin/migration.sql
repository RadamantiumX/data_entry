/*
  Warnings:

  - You are about to drop the column `role` on the `UserColab` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserColab" DROP COLUMN "role",
ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false;
