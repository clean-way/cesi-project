/*
  Warnings:

  - You are about to drop the `_DumpQuantitiesToTrash` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" DROP CONSTRAINT "_DumpQuantitiesToTrash_A_fkey";

-- DropForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" DROP CONSTRAINT "_DumpQuantitiesToTrash_B_fkey";

-- DropTable
DROP TABLE "_DumpQuantitiesToTrash";

-- CreateTable
CREATE TABLE "DumpQuantitiesTrash" (
    "Id" TEXT NOT NULL,
    "DumpQuantitiesId" TEXT NOT NULL,
    "TrashId" TEXT NOT NULL,

    CONSTRAINT "DumpQuantitiesTrash_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "DumpQuantitiesTrash" ADD CONSTRAINT "DumpQuantitiesTrash_DumpQuantitiesId_fkey" FOREIGN KEY ("DumpQuantitiesId") REFERENCES "DumpQuantities"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DumpQuantitiesTrash" ADD CONSTRAINT "DumpQuantitiesTrash_TrashId_fkey" FOREIGN KEY ("TrashId") REFERENCES "Trash"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
