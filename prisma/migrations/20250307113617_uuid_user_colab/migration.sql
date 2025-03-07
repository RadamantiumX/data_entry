/*
  Warnings:

  - The primary key for the `UserColab` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_userColabId_fkey";

-- AlterTable
ALTER TABLE "Data" ALTER COLUMN "userColabId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserColab" DROP CONSTRAINT "UserColab_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserColab_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserColab_id_seq";

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userColabId_fkey" FOREIGN KEY ("userColabId") REFERENCES "UserColab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
