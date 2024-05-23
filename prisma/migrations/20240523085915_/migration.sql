/*
  Warnings:

  - You are about to drop the column `authorId` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `pickedById` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Trash` table. All the data in the column will be lost.
  - Added the required column `imageUri` to the `Trash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Trash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'MODERATOR', 'AMDIN');

-- CreateEnum
CREATE TYPE "AccessDifficulties" AS ENUM ('NONE', 'BOAT', 'MOUNTAIN', 'FEETONLY');

-- DropForeignKey
ALTER TABLE "Trash" DROP CONSTRAINT "Trash_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Trash" DROP CONSTRAINT "Trash_pickedById_fkey";

-- AlterTable
ALTER TABLE "Trash" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "image",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "pickedById",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "imageUri" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Roles" NOT NULL;

-- CreateTable
CREATE TABLE "DumpQuantities" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "DumpQuantities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotTrash" (
    "id" TEXT NOT NULL,
    "trashId" TEXT NOT NULL,
    "spotId" TEXT NOT NULL,
    "quantityLeft" INTEGER NOT NULL,

    CONSTRAINT "SpotTrash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spot" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "startPhotoUri" TEXT NOT NULL,
    "endPhotoUri" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completeCleaningAt" TIMESTAMP(3),
    "access" "AccessDifficulties" NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotTrashUpdate" (
    "id" TEXT NOT NULL,
    "spotTrashId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "SpotTrashUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DumpQuantitiesToTrash" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DumpQuantitiesToTrash_AB_unique" ON "_DumpQuantitiesToTrash"("A", "B");

-- CreateIndex
CREATE INDEX "_DumpQuantitiesToTrash_B_index" ON "_DumpQuantitiesToTrash"("B");

-- AddForeignKey
ALTER TABLE "SpotTrash" ADD CONSTRAINT "SpotTrash_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES "Trash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTrash" ADD CONSTRAINT "SpotTrash_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTrashUpdate" ADD CONSTRAINT "SpotTrashUpdate_spotTrashId_fkey" FOREIGN KEY ("spotTrashId") REFERENCES "SpotTrash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTrashUpdate" ADD CONSTRAINT "SpotTrashUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" ADD CONSTRAINT "_DumpQuantitiesToTrash_A_fkey" FOREIGN KEY ("A") REFERENCES "DumpQuantities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" ADD CONSTRAINT "_DumpQuantitiesToTrash_B_fkey" FOREIGN KEY ("B") REFERENCES "Trash"("id") ON DELETE CASCADE ON UPDATE CASCADE;
