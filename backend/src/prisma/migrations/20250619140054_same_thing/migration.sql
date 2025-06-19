/*
  Warnings:

  - You are about to drop the column `serial` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serial]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_serial_key";

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "serial" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "serial";

-- CreateIndex
CREATE UNIQUE INDEX "Idea_serial_key" ON "Idea"("serial");
