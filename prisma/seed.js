const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        // Clear existing data
        await prisma.loan.deleteMany();
        await prisma.reservation.deleteMany();
        await prisma.document.deleteMany();
        await prisma.member.deleteMany();
        await prisma.employee.deleteMany();

        // Seed Members
        const members = await Promise.all([
            prisma.member.create({
                data: {
                    code: 'MEM001',
                    firstName: 'John',
                    lastName: 'Doe',
                    street: '123 Main St',
                    city: 'Montreal',
                    province: 'Quebec',
                    phone: '514-555-1234',
                    email: 'john.doe@example.com',
                    password: await bcrypt.hash('password123', 10),
                },
            }),
            prisma.member.create({
                data: {
                    code: 'MEM002',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    street: '456 Elm St',
                    city: 'Montreal',
                    province: 'Quebec',
                    phone: '514-555-5678',
                    email: 'jane.smith@example.com',
                    password: await bcrypt.hash('password123', 10),
                },
            }),
            prisma.member.create({
                data: {
                    code: 'MEM003',
                    firstName: 'Michael',
                    lastName: 'Johnson',
                    street: '789 Oak St',
                    city: 'Laval',
                    province: 'Quebec',
                    phone: '450-555-9012',
                    email: 'michael.johnson@example.com',
                    password: await bcrypt.hash('password123', 10),
                },
            }),
            prisma.member.create({
                data: {
                    code: 'MEM004',
                    firstName: 'Emily',
                    lastName: 'Brown',
                    street: '101 Pine St',
                    city: 'Quebec City',
                    province: 'Quebec',
                    phone: '418-555-3456',
                    email: 'emily.brown@example.com',
                    password: await bcrypt.hash('password123', 10),
                },
            }),
            prisma.member.create({
                data: {
                    code: 'MEM005',
                    firstName: 'David',
                    lastName: 'Wilson',
                    street: '202 Maple St',
                    city: 'Gatineau',
                    province: 'Quebec',
                    phone: '819-555-7890',
                    email: 'david.wilson@example.com',
                    password: await bcrypt.hash('password123', 10),
                },
            }),
        ]);

        // Seed Employees
        const employees = await Promise.all([
            prisma.employee.create({
                data: {
                    code: 'EMP001',
                    firstName: 'Sarah',
                    lastName: 'Davis',
                    street: '303 Cedar St',
                    city: 'Montreal',
                    province: 'Quebec',
                    phone: '514-555-2468',
                    email: 'sarah.davis@library.com',
                    password: await bcrypt.hash('admin123', 10),
                    role: 'admin',
                },
            }),
            prisma.employee.create({
                data: {
                    code: 'EMP002',
                    firstName: 'Robert',
                    lastName: 'Taylor',
                    street: '404 Birch St',
                    city: 'Montreal',
                    province: 'Quebec',
                    phone: '514-555-1357',
                    email: 'robert.taylor@library.com',
                    password: await bcrypt.hash('employee123', 10),
                    role: 'employee',
                },
            }),
            prisma.employee.create({
                data: {
                    code: 'EMP003',
                    firstName: 'Jessica',
                    lastName: 'Clark',
                    street: '505 Walnut St',
                    city: 'Laval',
                    province: 'Quebec',
                    phone: '450-555-8642',
                    email: 'jessica.clark@library.com',
                    password: await bcrypt.hash('employee123', 10),
                    role: 'employee',
                },
            }),
            prisma.employee.create({
                data: {
                    code: 'EMP004',
                    firstName: 'Thomas',
                    lastName: 'Moore',
                    street: '606 Ash St',
                    city: 'Montreal',
                    province: 'Quebec',
                    phone: '514-555-9753',
                    email: 'thomas.moore@library.com',
                    password: await bcrypt.hash('employee123', 10),
                    role: 'employee',
                },
            }),
            prisma.employee.create({
                data: {
                    code: 'EMP005',
                    firstName: 'Amanda',
                    lastName: 'Lee',
                    street: '707 Cypress St',
                    city: 'Montreal',
                    province: 'Quebec',
                    phone: '514-555-3141',
                    email: 'amanda.lee@library.com',
                    password: await bcrypt.hash('admin123', 10),
                    role: 'admin',
                },
            }),
        ]);

        // Seed Documents
        const documents = await Promise.all([
            prisma.document.create({
                data: {
                    code: 'DOC001',
                    title: 'To Kill a Mockingbird',
                    author: 'Harper Lee',
                    year: 1960,
                    category: 'Novel',
                    classifying: 'Adults',
                    type: 'Drama',
                    description: 'The story of racial injustice and the loss of innocence in the American South.',
                    ISBN: '9780061120084',
                    imagePath: '/images/to-kill-a-mockingbird.jpg',
                },
            }),
            prisma.document.create({
                data: {
                    code: 'DOC002',
                    title: 'The Great Gatsby',
                    author: 'F. Scott Fitzgerald',
                    year: 1925,
                    category: 'Novel',
                    classifying: 'Adults',
                    type: 'Drama',
                    description: 'A story of wealth, love, and the American Dream in the 1920s.',
                    ISBN: '9780743273565',
                    imagePath: '/images/the-great-gatsby.jpg',
                },
            }),
            prisma.document.create({
                data: {
                    code: 'DOC003',
                    title: 'Harry Potter and the Philosopher\'s Stone',
                    author: 'J.K. Rowling',
                    year: 1997,
                    category: 'Novel',
                    classifying: 'Teens',
                    type: 'Fantasy',
                    description: 'The first book in the Harry Potter series.',
                    ISBN: '9780747532743',
                    imagePath: '/images/harry-potter.jpg',
                },
            }),
            prisma.document.create({
                data: {
                    code: 'DOC004',
                    title: 'The Little Prince',
                    author: 'Antoine de Saint-Exupéry',
                    year: 1943,
                    category: 'Novel',
                    classifying: 'Kids',
                    type: 'Fantasy',
                    description: 'A poetic tale about a young prince who visits various planets.',
                    ISBN: '9780156012195',
                    imagePath: '/images/the-little-prince.jpg',
                },
            }),
            prisma.document.create({
                data: {
                    code: 'DOC005',
                    title: 'Batman: The Dark Knight Returns',
                    author: 'Frank Miller',
                    year: 1986,
                    category: 'Comics',
                    classifying: 'Teens',
                    type: 'Action',
                    description: 'A Batman story set in a dystopian future.',
                    ISBN: '9781563893421',
                    imagePath: '/images/batman-dark-knight.jpg',
                },
            }),
            prisma.document.create({
                data: {
                    code: 'DOC006',
                    title: 'The Legend of Zelda: Breath of the Wild',
                    author: 'Nintendo',
                    year: 2017,
                    category: 'VideoGame',
                    classifying: 'Teens',
                    type: 'Adventure',
                    description: 'An open-world action-adventure game for Nintendo Switch.',
                    imagePath: '/images/zelda-botw.jpg',
                },
            }),
        ]);

        // Seed Loans
        const today = new Date();
        const loans = await Promise.all([
            prisma.loan.create({
                data: {
                    memberId: members[0].id,
                    documentId: documents[0].id,
                    loanDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10),
                    expectedReturnDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20),
                },
            }),
            prisma.loan.create({
                data: {
                    memberId: members[1].id,
                    documentId: documents[1].id,
                    loanDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
                    expectedReturnDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 25),
                },
            }),
            prisma.loan.create({
                data: {
                    memberId: members[2].id,
                    documentId: documents[2].id,
                    loanDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15),
                    expectedReturnDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
                    actualReturnDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
                },
            }),
            prisma.loan.create({
                data: {
                    memberId: members[3].id,
                    documentId: documents[3].id,
                    loanDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 20),
                    expectedReturnDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
                },
            }),
            prisma.loan.create({
                data: {
                    memberId: members[4].id,
                    documentId: documents[4].id,
                    loanDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 12),
                    expectedReturnDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 18),
                },
            }),
        ]);

        // Seed Reservations
        const reservations = await Promise.all([
            prisma.reservation.create({
                data: {
                    memberId: members[0].id,
                    documentId: documents[5].id,
                    reservationDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
                    expiryDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
                    status: 'Pending',
                },
            }),
            prisma.reservation.create({
                data: {
                    memberId: members[1].id,
                    documentId: documents[2].id,
                    reservationDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
                    expiryDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
                    status: 'Pending',
                },
            }),
            prisma.reservation.create({
                data: {
                    memberId: members[2].id,
                    documentId: documents[4].id,
                    reservationDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8),
                    expiryDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
                    status: 'Fulfilled',
                },
            }),
            prisma.reservation.create({
                data: {
                    memberId: members[3].id,
                    documentId: documents[1].id,
                    reservationDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4),
                    expiryDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
                    status: 'Pending',
                },
            }),
            prisma.reservation.create({
                data: {
                    memberId: members[4].id,
                    documentId: documents[3].id,
                    reservationDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
                    expiryDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
                    status: 'Fulfilled',
                },
            }),
        ]);

        console.log('Database has been seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed(); 