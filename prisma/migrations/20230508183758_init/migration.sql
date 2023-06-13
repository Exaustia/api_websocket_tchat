-- DropForeignKey
ALTER TABLE `UserSession` DROP FOREIGN KEY `UserSession_userId_fkey`;

-- AlterTable
ALTER TABLE `UserSession` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
