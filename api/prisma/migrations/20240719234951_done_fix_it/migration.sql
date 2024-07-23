/*
  Warnings:

  - A unique constraint covering the columns `[professor_id,course_id,year,semester]` on the table `ProfessorCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfessorCourse_professor_id_course_id_year_semester_key" ON "ProfessorCourse"("professor_id", "course_id", "year", "semester");
