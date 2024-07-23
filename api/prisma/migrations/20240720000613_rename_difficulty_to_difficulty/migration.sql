/*
  Warnings:

  - You are about to drop the column `difficult` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "difficult",
ADD COLUMN     "difficulty" DOUBLE PRECISION;
