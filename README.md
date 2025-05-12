# LibrarySphere - Library Management System

A modern, responsive, and fully functional Library Management System built with Next.js, ShadCN UI, and MongoDB Atlas.

## Features

- **User Authentication**: Secure login and registration using NextAuth.js
- **Role-Based Access Control**: Different interfaces and permissions for members, employees, and administrators
- **Document Management**: Browse, search, and filter library documents
- **Loan Management**: Track borrowed documents, due dates, and returns
- **Reservation System**: Reserve documents that are currently on loan
- **Admin Dashboards**: Manage members, employees, and documents

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with React 19
- **UI Framework**: Tailwind CSS with ShadCN UI components
- **Database**: MongoDB Atlas via Prisma ORM
- **Authentication**: NextAuth.js

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/library-sphere.git
   cd library-sphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/LibrarySphereDB?retryWrites=true&w=majority"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Push schema to database:
   ```bash
   npx prisma db push
   ```

6. Seed the database:
   ```bash
   npm run seed
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```

## User Roles and Credentials

After seeding the database, the following users will be available:

### Admin User
- Email: employee1@example.com
- Password: password123

### Regular Employees
- Email: employee2@example.com through employee5@example.com
- Password: password123

### Members
- Email: member1@example.com through member5@example.com
- Password: password123

## Project Structure

- `/src/app`: Next.js app directory with routes and API endpoints
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and helpers
- `/prisma`: Database schema and seed script

## License

[MIT](LICENSE)
