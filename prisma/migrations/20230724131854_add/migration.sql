/*
  Warnings:

  - A unique constraint covering the columns `[discordName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitterName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitterId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `discordId` VARCHAR(191) NULL,
    ADD COLUMN `discordName` VARCHAR(191) NULL,
    ADD COLUMN `twitterId` VARCHAR(191) NULL,
    ADD COLUMN `twitterName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_discordName_key` ON `User`(`discordName`);

-- CreateIndex
CREATE UNIQUE INDEX `User_discordId_key` ON `User`(`discordId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_twitterName_key` ON `User`(`twitterName`);

-- CreateIndex
CREATE UNIQUE INDEX `User_twitterId_key` ON `User`(`twitterId`);
