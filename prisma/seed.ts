import { PrismaClient, Prisma } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const testData: Prisma.TestCreateInput[] = [
    {
        desc: "Alice",
    },
    {
        desc: "Bob",
    },
];

const userData: Prisma.UserCreateInput[] = [
    {  
        email: "alice@example.com",
        password: "password123",
        role: "worker",
        coins: 100,
        name: "Alice",
    },
    {  
        email: "bob@example.com",
        password: "password123",
        role: "worker",
        coins: 200,
        name: "Bob",
    },
    {
        email: "charlie@example.com",
        password: "password123",
        role: "worker",
        coins: 300,
        name: "Charlie",
    },
    {
        email: "david@example.com",
        password: "password123",
        role: "worker",
        coins: 400,
        name: "David",
    },
    {
        email: "eve@example.com",
        password: "password123",
        role: "worker",
        coins: 500,
        name: "Eve",
    },
    {
        email: "frank@example.com",
        password: "password123",
        role: "worker",
        coins: 600,
        name: "Frank",
    },
    {
        email: "grace@example.com",
        password: "password123",
        role: "worker",
        coins: 700,
        name: "Grace",
    },
    {
        email: "helen@example.com",
        password: "password123",
        role: "worker",
        coins: 800,
        name: "Helen",
    },
];



const jobTypeData: Prisma.JobTypeCreateInput[] = [
    {
        name: "Software Engineering",
    },
    {
        name: "Data Science",
    },
    {
        name: "Product Management",
    },
    {
        name: "AI Services"
    },
    {
        name: "Development & IT"
    },
    {
        name: "Design & Creative"
    },
    {
        name: "Sales & Marketing"
    },
    {
        name: "Writing & Translation"
    },
    {
        name: "Admin & Customer Support"
    },
    {
        name: "Finance & Accounting"
    },
    {
        name: "Legal"
    },
    {
        name: "HR & Training"
    },
    {
        name: "Engineering & Architecture"
    }

];




export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }
    for (const j of jobTypeData) {
        await prisma.jobType.create({ data: j });
    }
    for (const t of testData) {
        await prisma.test.create({ data: t });
    }
}

main();