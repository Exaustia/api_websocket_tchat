/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `RoomRestriction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Message_id_key` ON `Message`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Room_id_key` ON `Room`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `RoomRestriction_id_key` ON `RoomRestriction`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Subscription_id_key` ON `Subscription`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `UserSession_id_key` ON `UserSession`(`id`);
