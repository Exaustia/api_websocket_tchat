-- AlterTable
ALTER TABLE `Message` ADD COLUMN `isModerated` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `bannedUntil` DATETIME(3) NULL,
    ADD COLUMN `isBanned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isModerator` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isMuted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `mutedUntil` DATETIME(3) NULL;
