/*
  Warnings:

  - You are about to drop the column `accountVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoginTIme` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signupTIme` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('SPRING', 'SUMMER', 'FALL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountVerified",
DROP COLUMN "lastLoginTIme",
DROP COLUMN "signupTIme",
ADD COLUMN     "account_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_login_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "signup_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "rmp_id" TEXT,
    "school_id" INTEGER NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "quality" DOUBLE PRECISION NOT NULL,
    "difficult" DOUBLE PRECISION,
    "time" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "grade" TEXT,
    "professor_id" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "school_id" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessorCourse" (
    "id" SERIAL NOT NULL,
    "professor_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" "Semester" NOT NULL,

    CONSTRAINT "ProfessorCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorCourse" ADD CONSTRAINT "ProfessorCourse_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorCourse" ADD CONSTRAINT "ProfessorCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
