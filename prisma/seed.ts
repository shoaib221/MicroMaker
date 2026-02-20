import { PrismaClient, Prisma } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const userData: Prisma.TestCreateInput[] = [
    {
        desc: "Alice",
    },
    {
        desc: "Bob",
    },
];

export async function main() {
    for (const u of userData) {
        await prisma.test.create({ data: u });
    }
}

main();