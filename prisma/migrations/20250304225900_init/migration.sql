-- DropForeignKey
ALTER TABLE "ApiData" DROP CONSTRAINT "ApiData_dataId_fkey";

-- DropForeignKey
ALTER TABLE "ApiKeys" DROP CONSTRAINT "ApiKeys_apiDataId_fkey";

-- DropForeignKey
ALTER TABLE "ApiKeys" DROP CONSTRAINT "ApiKeys_dataId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_userColabId_fkey";

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userColabId_fkey" FOREIGN KEY ("userColabId") REFERENCES "UserColab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiData" ADD CONSTRAINT "ApiData_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_apiDataId_fkey" FOREIGN KEY ("apiDataId") REFERENCES "ApiData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
