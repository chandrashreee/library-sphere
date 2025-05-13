# LibrarySphere - Library Management System

LibrarySphere is a modern, responsive, and fully functional Library Management System built with Next.js, ShadCN UI, and MongoDB Atlas. It features role-based access control, real-time data handling, and streamlined management of documents, loans, reservations, and users.

## 📚 Features

- **Authentication & Authorization**
  - Secure login for members, employees, and admins
  - Role-based access control
  - Protected routes and API endpoints

- **Document Catalog**
  - Search and filter by category, age rating, genre, and keywords
  - Document availability status
  - Document loan and reservation functionality

- **Loans Management**
  - Create new loans
  - Track due dates and overdue items
  - Return processing

- **Reservations System**
  - Create reservations for unavailable items
  - Automatic reservation fulfillment when items are returned
  - Reservation status tracking

- **User Management**
  - Member management (view, add, edit, delete)
  - Employee management (view, add, edit, delete)
  - Profile information and activity

## 💻 Tech Stack

- **Frontend**: Next.js (App Router), ShadCN UI, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with ShadCN components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas connection string

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/library-sphere.git
cd library-sphere
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables by creating a `.env.local` file with:
```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/LibrarySphereDB?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Generate Prisma client and seed the database
```bash
npx prisma generate
npx prisma db push
npm run seed
```

5. Start the development server
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## 🔑 Demo Credentials

### Member Access
- Email: john.doe@example.com
- Password: password123

### Employee Access
- Email: robert.taylor@library.com
- Password: employee123

### Admin Access
- Email: sarah.davis@library.com
- Password: admin123

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com)
- [Prisma](https://prisma.io/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [NextAuth.js](https://next-auth.js.org/)
