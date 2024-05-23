/*
  Warnings:

  - The primary key for the `Articles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Articles` table. All the data in the column will be lost.
  - The primary key for the `CleanWalk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImage` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CleanWalk` table. All the data in the column will be lost.
  - The primary key for the `DumpQuantities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DumpQuantities` table. All the data in the column will be lost.
  - You are about to drop the column `imageUri` on the `DumpQuantities` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `DumpQuantities` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `DumpQuantities` table. All the data in the column will be lost.
  - The primary key for the `Spot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `access` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `completeCleaningAt` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `endPhotoUri` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `startPhotoUri` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Spot` table. All the data in the column will be lost.
  - The primary key for the `SpotTrash` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SpotTrash` table. All the data in the column will be lost.
  - You are about to drop the column `quantityLeft` on the `SpotTrash` table. All the data in the column will be lost.
  - You are about to drop the column `spotId` on the `SpotTrash` table. All the data in the column will be lost.
  - You are about to drop the column `trashId` on the `SpotTrash` table. All the data in the column will be lost.
  - The primary key for the `SpotTrashUpdate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `spotTrashId` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - The primary key for the `Trash` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `imageUri` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Trash` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_participants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AuthorId` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Body` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Articles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Title` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AuthorId` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EndAt` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `CleanWalk` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Latitude` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartAt` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `DumpQuantities` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ImageUri` to the `DumpQuantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Label` to the `DumpQuantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Quantity` to the `DumpQuantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Access` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AuthorId` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Spot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Latitude` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartPhotoUri` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `SpotTrash` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `QuantityLeft` to the `SpotTrash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SpotId` to the `SpotTrash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TrashId` to the `SpotTrash` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `SpotTrashUpdate` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Quantity` to the `SpotTrashUpdate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SpotTrashId` to the `SpotTrashUpdate` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Trash` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ImageUri` to the `Trash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Trash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `UpdatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "CleanWalk" DROP CONSTRAINT "CleanWalk_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Spot" DROP CONSTRAINT "Spot_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrash" DROP CONSTRAINT "SpotTrash_spotId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrash" DROP CONSTRAINT "SpotTrash_trashId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_spotTrashId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_userId_fkey";

-- DropForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" DROP CONSTRAINT "_DumpQuantitiesToTrash_A_fkey";

-- DropForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" DROP CONSTRAINT "_DumpQuantitiesToTrash_B_fkey";

-- DropForeignKey
ALTER TABLE "_participants" DROP CONSTRAINT "_participants_A_fkey";

-- DropForeignKey
ALTER TABLE "_participants" DROP CONSTRAINT "_participants_B_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_pkey",
DROP COLUMN "authorId",
DROP COLUMN "body",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "AuthorId" TEXT NOT NULL,
ADD COLUMN     "Body" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Articles_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "CleanWalk" DROP CONSTRAINT "CleanWalk_pkey",
DROP COLUMN "authorId",
DROP COLUMN "bannerImage",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "endDate",
DROP COLUMN "id",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "name",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "AuthorId" TEXT NOT NULL,
ADD COLUMN     "BannerImage" TEXT,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "EndAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "StartAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "CleanWalk_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "DumpQuantities" DROP CONSTRAINT "DumpQuantities_pkey",
DROP COLUMN "id",
DROP COLUMN "imageUri",
DROP COLUMN "label",
DROP COLUMN "quantity",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "ImageUri" TEXT NOT NULL,
ADD COLUMN     "Label" TEXT NOT NULL,
ADD COLUMN     "Quantity" INTEGER NOT NULL,
ADD CONSTRAINT "DumpQuantities_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Spot" DROP CONSTRAINT "Spot_pkey",
DROP COLUMN "access",
DROP COLUMN "authorId",
DROP COLUMN "completeCleaningAt",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "endPhotoUri",
DROP COLUMN "id",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "startPhotoUri",
DROP COLUMN "updatedAt",
ADD COLUMN     "Access" "AccessDifficulties" NOT NULL,
ADD COLUMN     "AuthorId" TEXT NOT NULL,
ADD COLUMN     "CompleteCleaningAt" TIMESTAMP(3),
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "EndPhotoUri" TEXT,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "StartPhotoUri" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Spot_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "SpotTrash" DROP CONSTRAINT "SpotTrash_pkey",
DROP COLUMN "id",
DROP COLUMN "quantityLeft",
DROP COLUMN "spotId",
DROP COLUMN "trashId",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "QuantityLeft" INTEGER NOT NULL,
ADD COLUMN     "SpotId" TEXT NOT NULL,
ADD COLUMN     "TrashId" TEXT NOT NULL,
ADD CONSTRAINT "SpotTrash_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_pkey",
DROP COLUMN "id",
DROP COLUMN "quantity",
DROP COLUMN "spotTrashId",
DROP COLUMN "userId",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Quantity" INTEGER NOT NULL,
ADD COLUMN     "SpotTrashId" TEXT NOT NULL,
ADD COLUMN     "UserId" TEXT,
ADD CONSTRAINT "SpotTrashUpdate_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Trash" DROP CONSTRAINT "Trash_pkey",
DROP COLUMN "id",
DROP COLUMN "imageUri",
DROP COLUMN "name",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "ImageUri" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD CONSTRAINT "Trash_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "id",
DROP COLUMN "image",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "updatedAt",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "EmailVerified" TIMESTAMP(3),
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Image" TEXT,
ADD COLUMN     "Latitude" DOUBLE PRECISION,
ADD COLUMN     "Longitude" DOUBLE PRECISION,
ADD COLUMN     "Name" TEXT,
ADD COLUMN     "Password" TEXT,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");

-- DropTable
DROP TABLE "_participants";

-- CreateTable
CREATE TABLE "CleanWalkParticipant" (
    "Id" TEXT NOT NULL,
    "CleanWalkId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "CleanWalkParticipant_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "CleanWalkParticipant" ADD CONSTRAINT "CleanWalkParticipant_CleanWalkId_fkey" FOREIGN KEY ("CleanWalkId") REFERENCES "CleanWalk"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleanWalkParticipant" ADD CONSTRAINT "CleanWalkParticipant_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleanWalk" ADD CONSTRAINT "CleanWalk_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTrash" ADD CONSTRAINT "SpotTrash_TrashId_fkey" FOREIGN KEY ("TrashId") REFERENCES "Trash"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTrash" ADD CONSTRAINT "SpotTrash_SpotId_fkey" FOREIGN KEY ("SpotId") REFERENCES "Spot"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTrashUpdate" ADD CONSTRAINT "SpotTrashUpdate_SpotTrashId_fkey" FOREIGN KEY ("SpotTrashId") REFERENCES "SpotTrash"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTrashUpdate" ADD CONSTRAINT "SpotTrashUpdate_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" ADD CONSTRAINT "_DumpQuantitiesToTrash_A_fkey" FOREIGN KEY ("A") REFERENCES "DumpQuantities"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DumpQuantitiesToTrash" ADD CONSTRAINT "_DumpQuantitiesToTrash_B_fkey" FOREIGN KEY ("B") REFERENCES "Trash"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
