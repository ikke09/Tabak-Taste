import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const tobaccoImportSchema = z.object({
  producer: z.object({
    name: z.string(),
    path: z.string(),
  }),
  amount: z.number().optional(),
  unit: z.string().optional().default("g"),
  price: z.number().optional(),
  currency: z.string().optional().default("€"),
  name: z.string(),
  tastes: z.array(z.string()),
  source: z.string(),
  ean: z.string().optional(),
  description: z.string().optional(),
});

type TobaccoImport = z.infer<typeof tobaccoImportSchema>;

async function seed() {
  const data = require("../resources/seed-data.json") as TobaccoImport[];

  for (const entry of data) {
    const importTobacco = tobaccoImportSchema.parse(entry);
    let producer;
    let tobaccoData;
    try {
      producer = await prisma.producer.upsert({
        where: {
          name: importTobacco.producer.name,
        },
        create: {
          ...importTobacco.producer,
        },
        update: {},
      });
    } catch (e) {
      const err = new Error("Failed to upsert producer");
      console.error("Failed to upsert producer", {
        producer: importTobacco.producer,
        prismaError: e,
      });
      throw err;
    }
    try {
      tobaccoData = {
        ...importTobacco,
        producerId: producer.id,
        producer: undefined,
      };
      await prisma.tobacco.create({
        data: tobaccoData,
      });
    } catch (e) {
      console.error("Failed to create tobacco", {
        tobacco: tobaccoData,
        prismaError: e,
      });
      throw new Error("Failed to create tobacco");
    }
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
