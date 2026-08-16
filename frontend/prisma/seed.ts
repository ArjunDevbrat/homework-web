import { PrismaClient } from '@prisma/client';

/**
 * Seed script — run with `npx prisma db seed`.
 *
 * Inserts a small, clearly-labelled set of demo records so a freshly provisioned database
 * is never empty when the coach first opens it. Idempotent: existing seed rows are removed
 * before reinserting, and real website submissions are left untouched.
 */
const prisma = new PrismaClient();

const SEED_SOURCE = 'seed';

async function main(): Promise<void> {
  await prisma.lead.deleteMany({ where: { source: SEED_SOURCE } });
  await prisma.contactSubmission.deleteMany({ where: { subject: { startsWith: '[seed]' } } });

  await prisma.lead.createMany({
    data: [
      {
        fullName: 'Anaya Rao',
        phone: '+919812345601',
        email: 'anaya.rao@example.com',
        age: 31,
        gender: 'FEMALE',
        goal: 'FAT_LOSS',
        healthIssue: 'None, but low energy through the afternoon',
        profession: 'IT project manager',
        programSlug: 'holistic-health',
        status: 'CONTACTED',
        source: SEED_SOURCE,
      },
      {
        fullName: 'Karthik Subramaniam',
        phone: '+919812345602',
        email: 'karthik.s@example.com',
        age: 27,
        gender: 'MALE',
        goal: 'MUSCLE_BUILDING',
        healthIssue: 'Old shoulder impingement, cleared by physiotherapist',
        profession: 'Product designer',
        programSlug: 'exercise-only',
        status: 'CONSULTED',
        source: SEED_SOURCE,
      },
      {
        fullName: 'Meera Pillai',
        phone: '+919812345603',
        email: null,
        age: 29,
        gender: 'FEMALE',
        goal: 'PCOS_MANAGEMENT',
        healthIssue: 'PCOS with irregular cycles, under gynaecologist care',
        profession: 'School teacher',
        programSlug: 'diet-plans',
        status: 'NEW',
        source: SEED_SOURCE,
      },
      {
        fullName: 'Rohit Mehta',
        phone: '+919812345604',
        email: 'rohit.mehta@example.com',
        age: 44,
        gender: 'MALE',
        goal: 'DIABETES_MANAGEMENT',
        healthIssue: 'Type 2 diabetes, HbA1c 8.2, on metformin',
        profession: 'Regional sales head',
        programSlug: 'holistic-health',
        status: 'CONVERTED',
        source: SEED_SOURCE,
      },
    ],
  });

  await prisma.contactSubmission.createMany({
    data: [
      {
        fullName: 'Priya Nair',
        email: 'priya.nair@example.com',
        subject: '[seed] Is the Diet Plans Program suitable for prediabetes?',
        message:
          'My fasting sugar is 112 and my doctor called it prediabetes. I already walk daily. Would the nutrition-only program be enough for me?',
      },
      {
        fullName: 'Aditya Sharma',
        email: 'aditya.sharma@example.com',
        subject: '[seed] Do the live classes work across time zones?',
        message:
          'I am based in Dubai and start work at 9 AM local time. Are the daily live classes recorded if I cannot attend them live?',
      },
    ],
  });

  const [leadCount, contactCount] = await Promise.all([
    prisma.lead.count(),
    prisma.contactSubmission.count(),
  ]);

  // eslint-disable-next-line no-console
  console.log(`Seed complete — ${leadCount} leads, ${contactCount} contact submissions in database.`);
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
