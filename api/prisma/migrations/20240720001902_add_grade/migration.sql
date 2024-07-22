/*
  Warnings:

  - The `grade` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('A_PLUS', 'A', 'A_MINUS', 'B_PLUS', 'B', 'B_MINUS', 'C_PLUS', 'C', 'C_MINUS', 'D_PLUS', 'D', 'D_MINUS', 'F_PLUS', 'F', 'F_MINUS', 'INCOMPLETE', 'WITHDRAWN', 'NOT_SURE', 'OTHER');

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "grade",
ADD COLUMN     "grade" "Grade";
