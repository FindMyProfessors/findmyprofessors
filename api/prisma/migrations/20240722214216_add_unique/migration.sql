/*
  Warnings:

  - A unique constraint covering the columns `[user_id,course_id,professor_id]` on the table `UserCart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCart_user_id_course_id_professor_id_key" ON "UserCart"("user_id", "course_id", "professor_id");
