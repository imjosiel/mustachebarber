/*
  Warnings:

  - You are about to drop the column `barberId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Barber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_barberId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "barberId";

-- DropTable
DROP TABLE "Barber";
