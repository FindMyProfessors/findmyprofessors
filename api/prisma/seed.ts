import { PrismaClient, Semester } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Create Schools
  const school1 = await prisma.school.create({
    data: { name: "School of Engineering" },
  });

  const school2 = await prisma.school.create({
    data: { name: "School of Arts" },
  });

  // Create Professors
  const professor1 = await prisma.professor.create({
    data: {
      first_name: "John",
      last_name: "Doe",
      school_id: school1.id,
    },
  });

  const professor2 = await prisma.professor.create({
    data: {
      first_name: "Jane",
      last_name: "Smith",
      school_id: school2.id,
    },
  });

  // Create Courses
  const course1 = await prisma.course.create({
    data: {
      name: "Introduction to Engineering",
      code: "ENG101",
      school_id: school1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: "History of Art",
      code: "ART101",
      school_id: school2.id,
    },
  });

  // Create ProfessorCourse relations
  await prisma.professorCourse.createMany({
    data: [
      {
        professor_id: professor1.id,
        course_id: course1.id,
        year: 2023,
        semester: Semester.FALL,
      },
      {
        professor_id: professor2.id,
        course_id: course2.id,
        year: 2023,
        semester: Semester.SPRING,
      },
    ],
  });

  // Create Reviews
  await prisma.review.createMany({
    data: [
      {
        quality: 4.5,
        time: new Date(),
        tags: ["helpful", "clear"],
        professor_id: professor1.id,
      },
      {
        quality: 3.8,
        time: new Date(),
        tags: ["knowledgeable"],
        professor_id: professor2.id,
      },
    ],
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
