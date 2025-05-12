const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    await prisma.$connect();

    // Delete all existing data
    await prisma.reservation.deleteMany({});
    await prisma.loan.deleteMany({});
    await prisma.document.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('Deleted existing data');

    // Create members
    const members = [];
    for (let i = 1; i <= 5; i++) {
        const hashedPassword = await bcrypt.hash('password123', 10);

        const member = await prisma.user.create({
            data: {
                code: `MEM${i.toString().padStart(3, '0')}`,
                firstName: `Member${i}First`,
                lastName: `Member${i}Last`,
                email: `member${i}@example.com`,
                password: hashedPassword,
                phone: `123-456-${i.toString().padStart(4, '0')}`,
                address: {
                    number: `${i}`,
                    street: 'Main Street',
                    city: 'Anytown',
                    province: 'State',
                },
                role: 'MEMBER',
            },
        });

        members.push(member);
        console.log(`Created member: ${member.code}`);
    }

    // Create employees (4 regular employees and 1 admin)
    const employees = [];
    for (let i = 1; i <= 5; i++) {
        const hashedPassword = await bcrypt.hash('password123', 10);

        const employee = await prisma.user.create({
            data: {
                code: `EMP${i.toString().padStart(3, '0')}`,
                firstName: `Employee${i}First`,
                lastName: `Employee${i}Last`,
                email: `employee${i}@example.com`,
                password: hashedPassword,
                phone: `123-789-${i.toString().padStart(4, '0')}`,
                address: {
                    number: `${i}`,
                    street: 'Office Street',
                    city: 'Worktown',
                    province: 'State',
                },
                role: i === 1 ? 'ADMIN' : 'EMPLOYEE', // First employee is admin
            },
        });

        employees.push(employee);
        console.log(`Created employee: ${employee.code} (${employee.role})`);
    }

    // Create documents
    const documentCategories = ['NOVEL', 'COMICS', 'GAMES', 'EDUCATIONAL', 'REFERENCE', 'OTHER'];
    const documentClassifyings = ['KIDS', 'TEENS', 'ADULTS'];
    const documentTypes = ['COMEDY', 'DRAMA', 'HORROR', 'SCIFI', 'FANTASY', 'ROMANCE', 'THRILLER', 'BIOGRAPHY', 'NONFICTION', 'OTHER'];

    const documents = [];
    for (let i = 1; i <= 6; i++) {
        const document = await prisma.document.create({
            data: {
                code: `DOC${i.toString().padStart(3, '0')}`,
                title: `Document Title ${i}`,
                author: `Author ${i}`,
                year: 2000 + i,
                category: documentCategories[i % documentCategories.length],
                classifying: documentClassifyings[i % documentClassifyings.length],
                type: documentTypes[i % documentTypes.length],
                description: `This is a description for document ${i}`,
                ISBN: `ISBN-${i}-12345-${i * 2}`,
                imagePath: `/images/document-${i}.jpg`,
            },
        });

        documents.push(document);
        console.log(`Created document: ${document.code}`);
    }

    // Create loans
    const loans = [];
    for (let i = 1; i <= 5; i++) {
        const loanDate = new Date();
        loanDate.setDate(loanDate.getDate() - i * 2); // Each loan starts at a different date

        const expectedReturnDate = new Date(loanDate);
        expectedReturnDate.setDate(expectedReturnDate.getDate() + 14); // 2 weeks loan

        // Only some loans are returned
        const actualReturnDate = i <= 2 ? new Date(loanDate.getTime() + (i * 7 * 24 * 60 * 60 * 1000)) : null;

        const loan = await prisma.loan.create({
            data: {
                userId: members[i - 1].id,
                documentId: documents[i - 1].id,
                loanDate,
                expectedReturnDate,
                actualReturnDate,
            },
        });

        loans.push(loan);
        console.log(`Created loan for ${members[i - 1].code} borrowing ${documents[i - 1].code}`);
    }

    // Create reservations
    const reservations = [];
    for (let i = 1; i <= 5; i++) {
        const reservationDate = new Date();
        reservationDate.setDate(reservationDate.getDate() - i); // Each reservation starts at a different date

        const reservation = await prisma.reservation.create({
            data: {
                userId: members[i - 1].id,
                documentId: documents[(i + 1) % documents.length].id, // Different document than loan
                reservationDate,
            },
        });

        reservations.push(reservation);
        console.log(`Created reservation for ${members[i - 1].code} reserving ${documents[(i + 1) % documents.length].code}`);
    }

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });