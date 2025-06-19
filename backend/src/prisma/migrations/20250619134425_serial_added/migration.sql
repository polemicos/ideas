/*
  Warnings:

  - A unique constraint covering the columns `[serial]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "serial" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_serial_key" ON "User"("serial");
