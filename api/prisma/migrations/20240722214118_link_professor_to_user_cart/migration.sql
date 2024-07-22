/*
  Warnings:

  - Added the required column `professor_id` to the `UserCart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCart" ADD COLUMN     "professor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCart" ADD CONSTRAINT "UserCart_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
