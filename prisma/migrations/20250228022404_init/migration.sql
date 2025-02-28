-- CreateTable
CREATE TABLE "UserColab" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserColab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "emailSource" TEXT NOT NULL,
    "emailSourcePsw" TEXT NOT NULL,
    "xUser" TEXT NOT NULL,
    "xPsw" TEXT NOT NULL,
    "userColabId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiData" (
    "id" SERIAL NOT NULL,
    "appName" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "dataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKeys" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "apiKeySecret" TEXT NOT NULL,
    "bearerToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "accessTokenSecret" TEXT NOT NULL,
    "apiDataId" INTEGER NOT NULL,
    "dataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserColab_username_key" ON "UserColab"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Data_emailSource_key" ON "Data"("emailSource");

-- CreateIndex
CREATE UNIQUE INDEX "Data_xUser_key" ON "Data"("xUser");

-- CreateIndex
CREATE UNIQUE INDEX "Data_userColabId_key" ON "Data"("userColabId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiData_dataId_key" ON "ApiData"("dataId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_apiDataId_key" ON "ApiKeys"("apiDataId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_dataId_key" ON "ApiKeys"("dataId");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userColabId_fkey" FOREIGN KEY ("userColabId") REFERENCES "UserColab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiData" ADD CONSTRAINT "ApiData_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_apiDataId_fkey" FOREIGN KEY ("apiDataId") REFERENCES "ApiData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
