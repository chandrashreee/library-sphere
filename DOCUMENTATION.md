# Library Sphere Documentation

## Table of Contents

1. [Introduction](#introduction)
   1. [Project Overview](#project-overview)
   2. [Features](#features)
   3. [Tech Stack](#tech-stack)

2. [Getting Started](#getting-started)
   1. [Prerequisites](#prerequisites)
   2. [Installation](#installation)
   3. [Environment Variables](#environment-variables)
   4. [Running Locally](#running-locally)
   5. [Deployment](#deployment)

3. [System Architecture](#system-architecture)
   1. [Database Design](#database-design)
   2. [API Routes](#api-routes)
   3. [Authentication](#authentication)
   4. [Client-Side Pages](#client-side-pages)

4. [User Guides](#user-guides)
   1. [Member Guide](#member-guide)
   2. [Staff Guide](#staff-guide)
   3. [Admin Guide](#admin-guide)

5. [Features Documentation](#features-documentation)
   1. [Catalog Management](#catalog-management)
   2. [Loan Management](#loan-management)
   3. [Reservation System](#reservation-system)
   4. [Member Management](#member-management)
   5. [Staff Administration](#staff-administration)

6. [API Reference](#api-reference)
   1. [Authentication Endpoints](#authentication-endpoints)
   2. [Document Endpoints](#document-endpoints)
   3. [Loan Endpoints](#loan-endpoints)
   4. [Reservation Endpoints](#reservation-endpoints)
   5. [Member Endpoints](#member-endpoints)
   6. [Employee Endpoints](#employee-endpoints)

7. [Database Schema](#database-schema)
   1. [Member Model](#member-model)
   2. [Employee Model](#employee-model)
   3. [Document Model](#document-model)
   4. [Loan Model](#loan-model)
   5. [Reservation Model](#reservation-model)
   6. [NextAuth Models](#nextauth-models)

8. [Development](#development)
   1. [Project Structure](#project-structure)
   2. [Coding Conventions](#coding-conventions)
   3. [Testing](#testing)
   4. [Contributing](#contributing)

9. [Troubleshooting](#troubleshooting)
   1. [Common Issues](#common-issues)
   2. [Debugging Tips](#debugging-tips)

10. [Changelog](#changelog)
    1. [Version History](#version-history)
    2. [Upcoming Features](#upcoming-features)

## Introduction

### Project Overview

Library Sphere is a comprehensive library management system designed to modernize and streamline the operations of libraries of all sizes. It provides a complete digital solution for managing a library's collection, patrons, and day-to-day operations.

The system addresses the core needs of library management:

- **Resource Management**: Tracking and organizing diverse collections including books, comics, video games, and films.
- **User Management**: Handling both library members and staff with different access levels and permissions.
- **Loan Operations**: Managing the borrowing and returning of library materials with automated due date calculations.
- **Reservation System**: Allowing members to reserve currently unavailable materials.
- **Catalog Browsing**: Providing an intuitive interface for members to discover library resources.

This project was built with scalability and ease of use in mind, making it suitable for small community libraries and larger institutional libraries alike. The system balances powerful administrative features with an accessible user interface to create an optimal experience for all stakeholders.

Library Sphere aims to reduce administrative overhead, improve resource utilization, and enhance the overall experience for library members through digital transformation of traditional library processes.

### Features

Library Sphere offers a comprehensive set of features designed to address all aspects of library management:

1. **User Authentication and Authorization**
   - Separate login flows for members and staff
   - Role-based access control (member, employee, admin)
   - Secure credential management with encryption
   - Session management with NextAuth

2. **Catalog Management**
   - Rich document browsing interface with filtering options
   - Advanced search functionality by title, author, category, etc.
   - Detailed document information display
   - Support for multiple media types (books, comics, video games, films)
   - Age-appropriate content classification (Kids, Teens, Adults)
   - Genre-based organization

3. **Loan System**
   - Check-out and return process management
   - Automated due date calculation
   - Loan status tracking (Active, Returned)
   - Prevention of duplicate loans
   - Limit enforcement for maximum loans per member

4. **Reservation System**
   - Request queue for currently loaned items
   - Reservation expiry date management
   - Reservation fulfillment workflow for staff
   - Reservation status tracking (Pending, Fulfilled, Cancelled)
   - Prevent duplicate reservations for the same document

5. **Member Management**
   - Member registration and profile management
   - Loan history tracking
   - Active loan monitoring
   - Reservation management interface
   - Account information maintenance

6. **Staff Administration**
   - Employee account management
   - Administrative dashboard for system overview
   - Document management interface
   - Member account administration
   - Loan and reservation oversight capabilities

7. **Document Processing**
   - Adding new documents to the collection
   - Updating document information
   - Managing document availability
   - Tracking document loan history
   - Document categorization and classification

8. **Transaction Security**
   - Database transactions to prevent race conditions
   - Data validation across all operations
   - Audit trail for critical operations
   - Error handling with informative messages

9. **Responsive UI**
   - Mobile-friendly design
   - Accessibility considerations
   - Intuitive navigation
   - Real-time feedback for user actions
   - Loading states to indicate processing

10. **Reporting**
    - Loan statistics
    - Member activity tracking
    - Collection usage analysis
    - Document popularity metrics
    - System activity logs

### Tech Stack

Library Sphere is built on a modern, scalable tech stack designed for performance, maintainability, and developer productivity:

#### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router architecture
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components built with Radix UI and Tailwind
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **State Management**: React Hooks and Context API
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) - Toast notifications for user feedback

#### Backend
- **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime
- **API Routes**: Next.js API Routes for serverless functions
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) - Complete authentication solution
- **Database ORM**: [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript

#### Database
- **Database**: [MongoDB](https://www.mongodb.com/) - NoSQL document database
- **Cloud Provider**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service

#### Deployment
- **Hosting Platform**: [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites
- **CI/CD**: Vercel's built-in continuous deployment pipeline
- **Environment Variables**: Managed through Vercel and .env files

#### Development Tools
- **Version Control**: [Git](https://git-scm.com/) with [GitHub](https://github.com/)
- **Package Management**: [npm](https://www.npmjs.com/)
- **Code Quality**: JavaScript best practices
- **Development Server**: Next.js with Turbopack for fast refresh

## Getting Started

### Prerequisites

Before setting up Library Sphere, ensure you have the following prerequisites installed and configured on your system:

1. **Node.js and npm**
   - Node.js version 18.17.0 or later
   - npm version 9.0.0 or later
   - Installation: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
   - Verify installation with:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Git version 2.30.0 or later
   - Installation: [https://git-scm.com/downloads](https://git-scm.com/downloads)
   - Verify installation with:
     ```bash
     git --version
     ```

3. **MongoDB Atlas Account**
   - A free MongoDB Atlas account for database hosting
   - Sign up at: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   - Create a new cluster (free tier is sufficient for development)
   - Set up database access credentials
   - Configure network access (IP whitelisting or allow access from anywhere for development)

4. **Code Editor**
   - VS Code, WebStorm, or any preferred code editor
   - Recommended VS Code extensions:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense
     - Prisma

5. **Environment Setup**
   - Ability to create and manage .env files for environment variables
   - Understanding of basic terminal/command-line operations

6. **Browser**
   - Latest version of Chrome, Firefox, Safari, or Edge for testing
   - Browser developer tools understanding is helpful

### Installation

Follow these steps to set up Library Sphere on your local machine:

1. **Clone the Repository**
   
   ```bash
   git clone https://github.com/chandrashreee/library-sphere.git
   cd library-sphere
   ```

2. **Install Dependencies**
   
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   
   Create a `.env.local` file in the project root with the following variables:
   
   ```
   # Database Connection
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/library-sphere?retryWrites=true&w=majority"
   
   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-for-next-auth"
   ```
   
   Replace the placeholder values with your actual MongoDB connection string and a secure random string for NextAuth.

4. **Generate Prisma Client**
   
   ```bash
   npx prisma generate
   ```

5. **Seed the Database**
   
   Populate the database with initial data:
   
   ```bash
   npm run seed
   ```
   
   This command will create sample documents, members, and staff accounts for testing purposes.

6. **Verify Installation**
   
   After completing the above steps, your Library Sphere installation should be ready for local development.

### Environment Variables

Library Sphere requires several environment variables to function properly. These variables control database connections, authentication, and other critical configurations.

#### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb+srv://username:password@cluster.mongodb.net/library-sphere?retryWrites=true&w=majority` |
| `NEXTAUTH_URL` | Base URL of your application | `http://localhost:3000` (dev) or `https://your-app.vercel.app` (prod) |
| `NEXTAUTH_SECRET` | Secret used to encrypt cookies and tokens | `a-secure-random-string-of-at-least-32-characters` |

#### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `NEXT_PUBLIC_APP_URL` | Public URL for client-side references | Same as `NEXTAUTH_URL` |

#### Environment Setup for Different Environments

1. **Development Environment**
   
   Create a `.env.local` file in the project root with the required variables.
   
   ```
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/library-sphere-dev?retryWrites=true&w=majority"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-development-secret-key"
   ```

2. **Production Environment**
   
   Set up environment variables on your hosting platform (e.g., Vercel).
   
   - Go to your project settings
   - Navigate to the Environment Variables section
   - Add all required variables
   - Ensure variables are added to the Production environment

3. **Testing Environment**
   
   Create a `.env.test` file for testing environment configurations.
   
   ```
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/library-sphere-test?retryWrites=true&w=majority"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-test-environment-secret-key"
   ```

#### Security Considerations

- Never commit `.env` files to version control
- Use different databases for development, testing, and production
- Regularly rotate the `NEXTAUTH_SECRET` value in production
- Use environment-specific secrets for each deployment environment

## System Architecture

*Sections to be completed*

## User Guides

*Sections to be completed*

## Features Documentation

*Sections to be completed*

## API Reference

*Sections to be completed*

## Database Schema

*Sections to be completed*

## Development

*Sections to be completed*

## Troubleshooting

*Sections to be completed*

## Changelog

*Sections to be completed* 