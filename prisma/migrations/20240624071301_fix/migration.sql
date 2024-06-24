/*
  Warnings:

  - The primary key for the `Articles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AuthorId` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `Body` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Articles` table. All the data in the column will be lost.
  - The primary key for the `CleanWalk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AuthorId` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `BannerImage` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `EndAt` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `Latitude` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `StartAt` on the `CleanWalk` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `CleanWalk` table. All the data in the column will be lost.
  - The primary key for the `CleanWalkParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CleanWalkId` on the `CleanWalkParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `CleanWalkParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `CleanWalkParticipant` table. All the data in the column will be lost.
  - The primary key for the `DumpQuantities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `DumpQuantities` table. All the data in the column will be lost.
  - You are about to drop the column `ImageUri` on the `DumpQuantities` table. All the data in the column will be lost.
  - You are about to drop the column `Label` on the `DumpQuantities` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `DumpQuantities` table. All the data in the column will be lost.
  - The primary key for the `DumpQuantitiesTrash` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DumpQuantitiesId` on the `DumpQuantitiesTrash` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `DumpQuantitiesTrash` table. All the data in the column will be lost.
  - You are about to drop the column `TrashId` on the `DumpQuantitiesTrash` table. All the data in the column will be lost.
  - The primary key for the `Spot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Access` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `AuthorId` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `CompleteCleaningAt` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `EndPhotoUri` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `Latitude` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `StartPhotoUri` on the `Spot` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Spot` table. All the data in the column will be lost.
  - The primary key for the `SpotTrash` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `SpotTrash` table. All the data in the column will be lost.
  - You are about to drop the column `QuantityLeft` on the `SpotTrash` table. All the data in the column will be lost.
  - You are about to drop the column `SpotId` on the `SpotTrash` table. All the data in the column will be lost.
  - You are about to drop the column `TrashId` on the `SpotTrash` table. All the data in the column will be lost.
  - The primary key for the `SpotTrashUpdate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `SpotTrashId` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `SpotTrashUpdate` table. All the data in the column will be lost.
  - The primary key for the `Trash` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `ImageUri` on the `Trash` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Trash` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `EmailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Latitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Articles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endAt` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `CleanWalk` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `latitude` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CleanWalk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cleanWalkId` to the `CleanWalkParticipant` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `CleanWalkParticipant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `CleanWalkParticipant` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `DumpQuantities` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `imageUri` to the `DumpQuantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `DumpQuantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `DumpQuantities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dumpQuantitiesId` to the `DumpQuantitiesTrash` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `DumpQuantitiesTrash` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `trashId` to the `DumpQuantitiesTrash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Spot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `latitude` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startPhotoUri` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Spot` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `SpotTrash` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `quantityLeft` to the `SpotTrash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotId` to the `SpotTrash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trashId` to the `SpotTrash` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `SpotTrashUpdate` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `quantity` to the `SpotTrashUpdate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotTrashId` to the `SpotTrashUpdate` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Trash` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `imageUri` to the `Trash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Trash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "CleanWalk" DROP CONSTRAINT "CleanWalk_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "CleanWalkParticipant" DROP CONSTRAINT "CleanWalkParticipant_CleanWalkId_fkey";

-- DropForeignKey
ALTER TABLE "CleanWalkParticipant" DROP CONSTRAINT "CleanWalkParticipant_UserId_fkey";

-- DropForeignKey
ALTER TABLE "DumpQuantitiesTrash" DROP CONSTRAINT "DumpQuantitiesTrash_DumpQuantitiesId_fkey";

-- DropForeignKey
ALTER TABLE "DumpQuantitiesTrash" DROP CONSTRAINT "DumpQuantitiesTrash_TrashId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Spot" DROP CONSTRAINT "Spot_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrash" DROP CONSTRAINT "SpotTrash_SpotId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrash" DROP CONSTRAINT "SpotTrash_TrashId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_SpotTrashId_fkey";

-- DropForeignKey
ALTER TABLE "SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_UserId_fkey";

-- DropIndex
DROP INDEX "User_Email_key";

-- AlterTable
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_pkey",
DROP COLUMN "AuthorId",
DROP COLUMN "Body",
DROP COLUMN "CreatedAt",
DROP COLUMN "Id",
DROP COLUMN "Title",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Articles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CleanWalk" DROP CONSTRAINT "CleanWalk_pkey",
DROP COLUMN "AuthorId",
DROP COLUMN "BannerImage",
DROP COLUMN "CreatedAt",
DROP COLUMN "Description",
DROP COLUMN "EndAt",
DROP COLUMN "Id",
DROP COLUMN "Latitude",
DROP COLUMN "Longitude",
DROP COLUMN "Name",
DROP COLUMN "StartAt",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "CleanWalk_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CleanWalkParticipant" DROP CONSTRAINT "CleanWalkParticipant_pkey",
DROP COLUMN "CleanWalkId",
DROP COLUMN "Id",
DROP COLUMN "UserId",
ADD COLUMN     "cleanWalkId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "CleanWalkParticipant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DumpQuantities" DROP CONSTRAINT "DumpQuantities_pkey",
DROP COLUMN "Id",
DROP COLUMN "ImageUri",
DROP COLUMN "Label",
DROP COLUMN "Quantity",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "imageUri" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD CONSTRAINT "DumpQuantities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DumpQuantitiesTrash" DROP CONSTRAINT "DumpQuantitiesTrash_pkey",
DROP COLUMN "DumpQuantitiesId",
DROP COLUMN "Id",
DROP COLUMN "TrashId",
ADD COLUMN     "dumpQuantitiesId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "trashId" TEXT NOT NULL,
ADD CONSTRAINT "DumpQuantitiesTrash_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Spot" DROP CONSTRAINT "Spot_pkey",
DROP COLUMN "Access",
DROP COLUMN "AuthorId",
DROP COLUMN "CompleteCleaningAt",
DROP COLUMN "CreatedAt",
DROP COLUMN "Description",
DROP COLUMN "EndPhotoUri",
DROP COLUMN "Id",
DROP COLUMN "Latitude",
DROP COLUMN "Longitude",
DROP COLUMN "StartPhotoUri",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "access" "AccessDifficulties" NOT NULL,
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "completeCleaningAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endPhotoUri" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startPhotoUri" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Spot_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SpotTrash" DROP CONSTRAINT "SpotTrash_pkey",
DROP COLUMN "Id",
DROP COLUMN "QuantityLeft",
DROP COLUMN "SpotId",
DROP COLUMN "TrashId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "quantityLeft" INTEGER NOT NULL,
ADD COLUMN     "spotId" TEXT NOT NULL,
ADD COLUMN     "trashId" TEXT NOT NULL,
ADD CONSTRAINT "SpotTrash_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_pkey",
DROP COLUMN "Id",
DROP COLUMN "Quantity",
DROP COLUMN "SpotTrashId",
DROP COLUMN "UserId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "spotTrashId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ADD CONSTRAINT "SpotTrashUpdate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Trash" DROP CONSTRAINT "Trash_pkey",
DROP COLUMN "Id",
DROP COLUMN "ImageUri",
DROP COLUMN "Name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "imageUri" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Trash_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "CreatedAt",
DROP COLUMN "Email",
DROP COLUMN "EmailVerified",
DROP COLUMN "Id",
DROP COLUMN "Image",
DROP COLUMN "Latitude",
DROP COLUMN "Longitude",
DROP COLUMN "Name",
DROP COLUMN "Password",
DROP COLUMN "Role",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "Roles" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CleanWalkParticipant" ADD CONSTRAINT "CleanWalkParticipant_cleanWalkId_fkey" FOREIGN KEY ("cleanWalkId") REFERENCES "CleanWalk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleanWalkParticipant" ADD CONSTRAINT "CleanWalkParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleanWalk" ADD CONSTRAINT "CleanWalk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DumpQuantitiesTrash" ADD CONSTRAINT "DumpQuantitiesTrash_dumpQuantitiesId_fkey" FOREIGN KEY ("dumpQuantitiesId") REFERENCES "DumpQuantities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DumpQuantitiesTrash" ADD CONSTRAINT "DumpQuantitiesTrash_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES "Trash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
