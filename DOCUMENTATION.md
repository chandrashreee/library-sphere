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

5. [User Guides](#user-guides)
   1. [Member Guide](#member-guide)
   2. [Staff Guide](#staff-guide)
   3. [Admin Guide](#admin-guide)

6. [Features Documentation](#features-documentation)
   1. [Catalog Management](#catalog-management)
   2. [Loan Management](#loan-management)
   3. [Reservation System](#reservation-system)
   4. [Member Management](#member-management)
   5. [Staff Administration](#staff-administration)

7. [API Reference](#api-reference)
   1. [Authentication Endpoints](#authentication-endpoints)
   2. [Document Endpoints](#document-endpoints)
   3. [Loan Endpoints](#loan-endpoints)
   4. [Reservation Endpoints](#reservation-endpoints)
   5. [Member Endpoints](#member-endpoints)
   6. [Employee Endpoints](#employee-endpoints)

8. [Database Schema](#database-schema)
   1. [Member Model](#member-model)
   2. [Employee Model](#employee-model)
   3. [Document Model](#document-model)
   4. [Loan Model](#loan-model)
   5. [Reservation Model](#reservation-model)
   6. [NextAuth Models](#nextauth-models)

9. [Development](#development)
   1. [Project Structure](#project-structure)
   2. [Coding Conventions](#coding-conventions)
   3. [Testing](#testing)
   4. [Contributing](#contributing)

10. [Troubleshooting](#troubleshooting)
    1. [Common Issues](#common-issues)
    2. [Debugging Tips](#debugging-tips)

11. [Changelog](#changelog)
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

### Running Locally

Once you've completed the installation and configuration process, you can run Library Sphere locally for development purposes.

#### Development Server

Start the development server with:

```bash
npm run dev
```

This command runs the application with Turbopack for faster refresh times during development. The application will be available at [http://localhost:3000](http://localhost:3000).

#### Development Features

The development mode includes several features to improve the development experience:

1. **Hot Module Replacement (HMR)**
   - Code changes are reflected immediately without full page refreshes
   - State is preserved when possible

2. **Error Overlay**
   - Runtime errors are displayed directly in the browser
   - Stacktraces are shown for easier debugging

3. **API Route Hot Reloading**
   - Changes to API routes are available immediately
   - No server restart required when modifying API logic

#### Accessing Different User Roles

To test different user roles, use the following demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Member | john.doe@example.com | password123 |
| Employee | robert.taylor@library.com | employee123 |
| Admin | sarah.davis@library.com | admin123 |

#### Local Testing Workflow

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Access the Application**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

3. **Login with Test Credentials**
   Use one of the demo accounts to access the corresponding role's functionality

4. **Test Features**
   Explore the application's features based on the role you're currently logged in as

5. **Monitor Terminal Output**
   The terminal running the development server will display logs, errors, and other helpful information

### Deployment

Library Sphere is designed to be deployed to production environments with minimal configuration. This section covers the recommended deployment process using Vercel, though the application can be deployed to any platform that supports Next.js applications.

#### Deploying to Vercel

Vercel is the recommended platform for deploying Library Sphere, as it offers seamless integration with Next.js applications.

1. **Create a Vercel Account**
   
   If you don't already have one, sign up for a free Vercel account at [https://vercel.com/signup](https://vercel.com/signup).

2. **Install Vercel CLI (Optional)**
   
   ```bash
   npm install -g vercel
   ```

3. **Configure Project for Deployment**
   
   Ensure your project has a `vercel.json` file in the root directory:
   
   ```json
   {
     "buildCommand": "prisma generate && next build",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   ```

4. **Set Up Environment Variables**
   
   Configure environment variables in the Vercel dashboard:
   
   - Go to your project settings
   - Navigate to the Environment Variables section
   - Add all required variables (see Environment Variables section)
   - Make sure to use production-appropriate values, especially for database connections

5. **Deploy Using GitHub Integration (Recommended)**
   
   a. Push your code to a GitHub repository
   b. In Vercel, click "Import Project"
   c. Select "Import Git Repository"
   d. Choose your Library Sphere repository
   e. Configure the project settings
   f. Click "Deploy"
   
   Vercel will automatically deploy your application and provide a URL.

6. **Deploy Using Vercel CLI (Alternative)**
   
   ```bash
   vercel
   ```
   
   Follow the prompts to deploy your application.

7. **Configure Custom Domain (Optional)**
   
   a. In the Vercel dashboard, go to your project settings
   b. Navigate to the Domains section
   c. Add your custom domain
   d. Follow Vercel's instructions for DNS configuration

#### Deployment Best Practices

1. **Database Considerations**
   
   - Use a production MongoDB Atlas cluster
   - Set up database backups
   - Configure proper network security for database access

2. **Environment Configuration**
   
   - Use strong, unique secrets for production
   - Never share production credentials
   - Set NODE_ENV to "production"

3. **Performance Optimization**
   
   - Enable Vercel's Edge Functions for global distribution
   - Configure caching strategies if needed
   - Consider using a CDN for static assets

4. **Monitoring and Logging**
   
   - Set up error monitoring (Sentry, LogRocket, etc.)
   - Configure application logging
   - Set up uptime monitoring

5. **Continuous Deployment**
   
   - Set up a CI/CD pipeline using GitHub Actions or Vercel's built-in deployment
   - Implement pull request previews
   - Use environment branch deployments for staging environments

## System Architecture

### Database Design

Library Sphere uses MongoDB, a NoSQL document database, with Prisma ORM to provide a flexible but structured data model. The database design follows a document-oriented approach while maintaining relational aspects through references.

#### Database Architecture

The database architecture is designed to support the core functionality of a library management system with the following key entities:

1. **Member**
   - Represents library patrons who can borrow documents
   - Contains personal information, contact details, and authentication credentials
   - Linked to loans and reservations

2. **Employee**
   - Represents library staff with different permission levels
   - Contains personal information, contact details, and authentication credentials
   - Includes role information (employee or admin)

3. **Document**
   - Represents library materials (books, comics, games, films)
   - Contains metadata such as title, author, year, and classification
   - Linked to loans and reservations

4. **Loan**
   - Represents the borrowing transaction of a document by a member
   - Contains loan dates, return information, and status
   - Links members and documents

5. **Reservation**
   - Represents requests for currently unavailable documents
   - Contains reservation dates, expiry date, and status
   - Links members and documents

6. **NextAuth Tables**
   - Supports authentication via NextAuth.js
   - Includes Account, Session, and VerificationToken collections

#### Entity Relationships

The relationships between entities are maintained through document references:

```
Member
  │
  ├── Loans (one-to-many) ──┐
  │                         │
  └── Reservations (one-to-many) ┐
                           │     │
Document                   │     │
  │                        │     │
  ├── Loans (one-to-many) ─┘     │
  │                              │
  └── Reservations (one-to-many) ┘
```

#### Data Model Design Principles

1. **Normalization Balance**
   - Data is normalized to reduce redundancy while maintaining performance
   - Some denormalization for frequently accessed data patterns

2. **Referential Integrity**
   - Foreign key relationships are maintained through Prisma's relation fields
   - Document references ensure data consistency

3. **Indexing Strategy**
   - Strategic indexes on frequently queried fields to improve performance
   - Compound indexes for common query patterns

4. **Data Validation**
   - Schema-level validation through Prisma schema
   - Additional application-level validation for complex business rules

5. **Unique Constraints**
   - Unique indexes to prevent duplicate entries
   - Compound uniqueness constraints for business rules (e.g., one active loan per document)

#### MongoDB Atlas Configuration

Library Sphere is designed to work with MongoDB Atlas, which provides:

1. **Scalability**
   - Automatic scaling as data size increases
   - Distributed database architecture

2. **Reliability**
   - Automated backups
   - High availability through replica sets

3. **Security**
   - Network security through IP whitelisting
   - Encrypted connections with TLS/SSL
   - Database user access controls

### API Routes

Library Sphere uses Next.js API routes to provide a RESTful API for client-server communication. These API routes handle data fetching, authentication, and business logic operations.

#### API Architecture

The API follows REST principles and is organized around the core resources of the application:

1. **Authentication**
   - `/api/auth/[...nextauth]`: Authentication endpoints powered by NextAuth.js
   - Handles login, session management, and token validation

2. **Documents**
   - `/api/documents`: Manages the library collection
   - Supports CRUD operations for documents
   - Includes filtering and search capabilities

3. **Loans**
   - `/api/loans`: Manages document borrowing
   - Handles creating, updating, and retrieving loans
   - Enforces business rules like availability checks

4. **Reservations**
   - `/api/reservations`: Manages document reservation requests
   - Handles creating, fulfilling, and cancelling reservations
   - Enforces reservation rules and priorities

5. **Members**
   - `/api/members`: Manages library patrons
   - Handles member registration and profile management
   - Provides access to member-specific information

6. **Employees**
   - `/api/employees`: Manages library staff
   - Supports employee account management
   - Enforces role-based access controls

#### API Design Principles

1. **RESTful Resource Modeling**
   - Resources match database entities
   - HTTP methods align with CRUD operations (GET, POST, PUT, DELETE)
   - Consistent URL structure for predictability

2. **Authentication and Authorization**
   - JWT-based authentication via NextAuth.js
   - Role-based access control for protected endpoints
   - Session validation for secure operations

3. **Error Handling**
   - Consistent error response format
   - Appropriate HTTP status codes
   - Descriptive error messages for debugging

4. **Transaction Management**
   - Prisma transactions for multi-step operations
   - Rollback capabilities to ensure data integrity
   - Concurrency handling for race conditions

5. **API Response Structure**

   Successful responses follow a consistent format:
   ```json
   {
     "data": { /* response data */ },
     "message": "Operation successful"
   }
   ```

   Error responses follow this format:
   ```json
   {
     "error": "Error message",
     "status": 400
   }
   ```

#### API Route Implementation

API routes are implemented as serverless functions that run on-demand:

1. **Request Validation**
   - Input validation for all requests
   - Type checking and data sanitization
   - Required field validation

2. **Authentication Middleware**
   - Session validation via NextAuth
   - Role permission checks
   - Route protection based on user type

3. **Database Operations**
   - Prisma client for database interactions
   - Optimized queries with proper selections
   - Transaction support for atomic operations

4. **Response Formatting**
   - Consistent JSON structure
   - Appropriate HTTP status codes
   - CORS headers for cross-origin requests

### Authentication

Library Sphere implements a comprehensive authentication system using NextAuth.js to secure the application and manage user sessions. The authentication system supports different user roles with varying permissions and access levels.

#### Authentication Architecture

The authentication system follows a token-based approach with the following components:

1. **NextAuth.js Integration**
   - Central authentication provider for the application
   - Handles session management and token generation
   - Provides API routes for authentication operations

2. **Credentials Provider**
   - Email and password authentication
   - Role-based login flow (member vs. staff)
   - Password validation and security measures

3. **Session Management**
   - JWT (JSON Web Token) based sessions
   - Secure cookie storage for session information
   - Server-side session validation

4. **User Roles and Permissions**
   - Three distinct roles: Member, Employee, and Admin
   - Role-specific access controls
   - Permission-based feature availability

#### Authentication Flow

The authentication process follows this sequence:

1. **Login Request**
   - User submits credentials (email, password, and role)
   - Credentials are sent to the NextAuth API endpoint

2. **Credential Verification**
   - System checks credentials against the appropriate collection (Member or Employee)
   - Password is verified using bcrypt comparison
   - Role is validated to ensure the user exists in the correct collection

3. **Session Creation**
   - Upon successful verification, NextAuth generates a JWT
   - User information and role are encoded in the token
   - Session is established with appropriate expiration time

4. **Session Persistence**
   - Session token is stored in a secure HTTP-only cookie
   - Token is refreshed automatically when needed
   - Session information is available to API routes for authorization

5. **Authorization Checks**
   - Protected routes verify the user's session and role
   - API endpoints validate permissions before processing requests
   - UI components conditionally render based on user role

#### Security Measures

The authentication system implements several security best practices:

1. **Password Security**
   - Passwords are hashed using bcrypt before storage
   - No plaintext passwords are stored in the database
   - Strong password policies are enforced

2. **Token Security**
   - JWTs are signed with a secure secret
   - Tokens have appropriate expiration times
   - HTTP-only cookies prevent client-side token access

3. **CSRF Protection**
   - Cross-Site Request Forgery protection via NextAuth
   - Token validation on state-changing operations
   - Secure cookie configuration

4. **Session Validation**
   - Server-side validation of all session tokens
   - Expired sessions are automatically invalidated
   - Invalid sessions redirect to the login page

5. **Role Separation**
   - Strict separation between member and staff access
   - Clear boundaries between employee and admin capabilities
   - UI and API-level enforcement of role permissions

### Client-Side Pages

Library Sphere follows the Next.js App Router architecture to create a responsive, performant user interface. This section describes the client-side page structure, routing system, and component architecture.

#### Page Architecture

The application uses a modular page structure organized by feature:

1. **Public Pages**
   - `/login`: Authentication page for all users
   - `/catalog`: Document browsing interface (accessible to all users)

2. **Member Pages**
   - `/account`: Member profile and personal information
   - `/loans`: View and manage loans
   - `/reservations`: View and manage reservations

3. **Staff Pages**
   - `/members`: Manage library members
   - `/employees`: Manage staff accounts (admin only)
   - `/documents`: Manage the document collection

#### Routing System

The routing system is built on Next.js App Router, which provides:

1. **File-Based Routing**
   - Pages defined by file structure in the `app` directory
   - Dynamic routes using folder naming conventions
   - Automatic route handling and navigation

2. **Route Protection**
   - Middleware-based route protection
   - Role-based access control
   - Redirect logic for unauthorized access

3. **Navigation Components**
   - Role-specific navigation menu
   - Dynamic route highlighting
   - Responsive mobile navigation

#### Component Architecture

The application follows a component-based architecture with several layers:

1. **Layout Components**
   - `MainLayout`: Primary application layout with navigation
   - `AuthLayout`: Layout for authentication pages
   - `DashboardLayout`: Layout for authenticated user pages

2. **Page Components**
   - Page-specific components with business logic
   - Integration with API routes for data fetching
   - State management for user interactions

3. **UI Components**
   - Shared components from shadcn/ui library
   - Custom components for specific UI patterns
   - Consistent styling through Tailwind CSS

4. **Feature Components**
   - Document display components
   - Loan management components
   - Reservation handling components
   - User profile components

#### State Management

Client-side state is managed through a combination of approaches:

1. **React Hooks**
   - `useState` for component-level state
   - `useEffect` for side effects and data fetching
   - `useContext` for cross-component state sharing

2. **Server State**
   - API-driven data fetching
   - Optimistic UI updates
   - Error handling and loading states

3. **Form State**
   - React Hook Form for form state management
   - Zod validation for data validation
   - Controlled inputs for complex forms

#### Client-Side Performance Optimizations

Several techniques are employed to ensure optimal client-side performance:

1. **Component Optimization**
   - Lazy loading for non-essential components
   - Memoization of expensive computations
   - Virtualized lists for large data sets

2. **Data Fetching**
   - Request deduplication
   - Caching strategies
   - Pagination for large data sets

3. **UI Responsiveness**
   - Loading states and skeletons
   - Optimistic UI updates
   - Debounced inputs for search operations

4. **Rendering Strategies**
   - Client Components for interactive elements
   - Strategic use of suspense boundaries
   - Error boundaries for fault tolerance

## User Guides

### Member Guide

This guide provides detailed instructions for library members on how to use the Library Sphere system for browsing, borrowing, and managing their library activities.

#### Account Management

1. **Logging In**
   
   To access your member account:
   
   - Navigate to the login page at `/login`
   - Select the "Member" option
   - Enter your email and password
   - Click "Sign In"
   
   If you forget your password, contact a library staff member for assistance.

2. **Viewing Your Profile**
   
   To view your profile information:
   
   - Log in to your account
   - Navigate to the "Account" section
   - Here you can view your personal information, including:
     - Name and contact details
     - Library code
     - Membership status

3. **Account Security**
   
   Protect your account by:
   
   - Using a strong password
   - Not sharing your login credentials
   - Logging out when using public computers
   - Reporting suspicious activity to library staff

#### Browsing the Catalog

1. **Accessing the Catalog**
   
   To browse available documents:
   
   - Navigate to the "Catalog" section from the main menu
   - The catalog displays all library documents with availability status

2. **Searching for Documents**
   
   To find specific documents:
   
   - Use the search bar at the top of the catalog page
   - Enter keywords related to the title, author, or description
   - Results update as you type

3. **Filtering the Catalog**
   
   To narrow down results:
   
   - Use the filter options below the search bar
   - Filter by category (Novel, Comics, VideoGame, Film)
   - Filter by age rating (Kids, Teens, Adults)
   - Filter by genre (Action, Adventure, Comedy, etc.)
   - Reset filters using the "Reset Filters" button

4. **Viewing Document Details**
   
   To see more information about a document:
   
   - Click the "View Details" button on a document card
   - A dialog will appear showing complete information, including:
     - Title, author, and year
     - Category and genre
     - Description
     - Availability status
     - ISBN and library code

#### Borrowing Documents

1. **Checking Availability**
   
   Before borrowing:
   
   - Look for availability status on document cards
   - Available documents display a "Loan" button
   - Unavailable documents show their status (On Loan, Reserved)

2. **Loaning a Document**
   
   To borrow an available document:
   
   - Locate the document in the catalog
   - Click the "Loan" button
   - Confirm the loan request when prompted
   - Upon success, the document will be added to your loans

3. **Viewing Your Loans**
   
   To view your current loans:
   
   - Navigate to the "Loans" section from the main menu
   - Here you can see all your active loans with:
     - Loan date
     - Expected return date
     - Return status

4. **Loan Restrictions**
   
   Be aware of the following loan limitations:
   
   - You can only have one copy of a document at a time
   - There may be a maximum number of concurrent loans
   - Some documents may have restricted loan periods
   - You cannot loan documents reserved by other members

#### Reserving Documents

1. **Understanding Reservations**
   
   Reservations allow you to:
   
   - Request documents that are currently on loan
   - Get priority access when the document becomes available
   - Hold a document for a limited time

2. **Creating a Reservation**
   
   To reserve a document:
   
   - Find the document in the catalog
   - If it's unavailable, click the "Reserve" button
   - Confirm the reservation when prompted
   - Upon success, the document will be added to your reservations

3. **Managing Reservations**
   
   To view and manage your reservations:
   
   - Navigate to the "Reservations" section from the main menu
   - Here you can see:
     - Pending reservations awaiting document availability
     - Fulfilled reservations that are ready for pickup
     - Reservation expiry dates

4. **Reservation Restrictions**
   
   Be aware of the following reservation limitations:
   
   - You cannot reserve a document you already have on loan
   - You can only have one reservation per document
   - Reservations expire if not fulfilled within a certain period
   - There may be a maximum number of concurrent reservations allowed

#### Getting Help

If you encounter any issues while using the system:

1. **Contact Library Staff**
   - Visit the library information desk
   - Call the library help line
   - Email the library support address

2. **Common Issues**
   - Login problems: Contact the library for credential reset
   - Catalog browsing issues: Try refreshing the page or clearing browser cache
   - Loan/reservation errors: Note the error message and report to staff

3. **Feature Requests**
   - Submit suggestions to the library administration
   - Participate in user surveys to improve the system

### Staff Guide

This guide provides instructions for library staff members (employees and administrators) on how to use Library Sphere to manage the library's collection, members, and day-to-day operations.

#### Staff Account Management

1. **Logging In**
   
   To access your staff account:
   
   - Navigate to the login page at `/login`
   - Select the "Staff" option
   - Enter your email and password
   - Click "Sign In"
   
   Staff accounts have elevated permissions compared to member accounts.

2. **Understanding Staff Roles**
   
   Library Sphere supports two staff roles:
   
   - **Employee**: Regular staff with document and member management abilities
   - **Admin**: Administrators with additional employee management capabilities
   
   Your role determines which features you can access in the system.

3. **Account Security**
   
   Staff accounts have access to sensitive information, so follow these security practices:
   
   - Use a strong, unique password
   - Never share your credentials
   - Log out when leaving your workstation
   - Report suspicious activities to system administrators

#### Managing Documents

1. **Viewing the Document Collection**
   
   To access the document management interface:
   
   - Navigate to the "Documents" section from the main menu
   - Here you can see all documents in the library's collection
   - Use search and filters to find specific documents

2. **Adding New Documents**
   
   To add a new document to the collection:
   
   - Click "Add Document" button
   - Fill in the required information:
     - Title, author, and year
     - Category (Novel, Comics, VideoGame, Film)
     - Age rating (Kids, Teens, Adults)
     - Genre and description
     - ISBN (for books) and library code
   - Upload a cover image if available
   - Click "Save" to add the document

3. **Editing Documents**
   
   To modify an existing document:
   
   - Find the document in the documents list
   - Click "Edit" on the document you want to modify
   - Update the information as needed
   - Click "Save" to apply changes

4. **Removing Documents**
   
   To remove a document from the collection:
   
   - Find the document in the documents list
   - Click "Delete" on the document you want to remove
   - Confirm the deletion when prompted
   
   Note: Documents with active loans cannot be deleted.

#### Managing Members

1. **Viewing Member Accounts**
   
   To access the member management interface:
   
   - Navigate to the "Members" section from the main menu
   - Here you can see all registered library members
   - Use search to find specific members by name, email, or code

2. **Adding New Members**
   
   To register a new member:
   
   - Click "Add Member" button
   - Fill in the required information:
     - First and last name
     - Contact information (email, phone)
     - Address details
     - Password for their account
   - The system will generate a unique member code
   - Click "Save" to create the member account

3. **Editing Member Information**
   
   To update member details:
   
   - Find the member in the members list
   - Click "Edit" on the member you want to modify
   - Update the information as needed
   - Click "Save" to apply changes

4. **Viewing Member Activity**
   
   To see a member's library activity:
   
   - Find the member in the members list
   - Click "View Details" to see their profile
   - Here you can see:
     - Current loans
     - Loan history
     - Active reservations
     - Account status

#### Managing Loans

1. **Processing New Loans**
   
   To create a loan for a member:
   
   - Find the document in the catalog
   - Verify it's available (not on loan or reserved)
   - Click "Loan" and select the member from the list
   - Confirm the loan details
   - The system will record the loan and set the return date

2. **Viewing Active Loans**
   
   To see all current loans:
   
   - Navigate to the "Loans" section from the main menu
   - Here you can see all active loans with member and document information
   - Use filters to view specific categories of loans

3. **Processing Returns**
   
   To mark a document as returned:
   
   - Find the loan in the loans list
   - Click "Return" on the loan you want to process
   - Confirm the return action
   - The system will update the document's availability

4. **Managing Overdue Loans**
   
   To handle overdue items:
   
   - Use the "Overdue" filter in the loans section
   - Contact members with overdue items
   - Process returns when items are brought back
   - Note any damages or issues with returned items

#### Managing Reservations

1. **Viewing Active Reservations**
   
   To see all current reservations:
   
   - Navigate to the "Reservations" section from the main menu
   - Here you can see all pending and fulfilled reservations
   - Use filters to view specific categories of reservations

2. **Fulfilling Reservations**
   
   When a reserved document becomes available:
   
   - The system automatically shows it as available for fulfillment
   - Find the reservation in the reservations list
   - Click "Fulfill" on the reservation
   - Confirm the fulfillment action
   - The system will create a loan for the member

3. **Cancelling Reservations**
   
   To cancel a reservation:
   
   - Find the reservation in the reservations list
   - Click "Cancel" on the reservation you want to remove
   - Provide a reason for cancellation
   - Confirm the cancellation action

4. **Managing Expired Reservations**
   
   The system automatically expires reservations after their hold period:
   
   - Expired reservations are marked accordingly
   - You can filter to view expired reservations
   - No action is needed as the system handles this automatically

#### Staff-Only Features

1. **Batch Processing**
   
   For efficiency with multiple items:
   
   - Use batch operations for processing multiple returns
   - Generate reports for library usage statistics
   - Export data for external record-keeping

2. **System Notifications**
   
   Stay informed about library activities:
   
   - View notification center for important alerts
   - See new reservations that need attention
   - Monitor overdue loans that require follow-up

3. **Member Communications**
   
   Contact members when needed:
   
   - Send reservation notifications
   - Issue overdue reminders
   - Communicate library announcements

### Admin Guide

This guide provides instructions specifically for library administrators on how to manage the Library Sphere system, including employee management and system configuration.

#### Administrator Account

1. **Admin Privileges**
   
   Administrator accounts have all the capabilities of regular staff members, plus:
   
   - Employee management
   - System configuration
   - Advanced reporting
   - Data management

2. **Accessing Admin Functions**
   
   To access administrator-specific functions:
   
   - Log in with an admin account
   - Navigate to the appropriate section from the main menu
   - Admin-only options will be visible in various sections of the application

3. **Security Responsibilities**
   
   As an administrator, you have additional security responsibilities:
   
   - Regularly review system logs for suspicious activities
   - Manage staff accounts and access permissions
   - Ensure proper data backup procedures
   - Monitor system performance and reliability

#### Managing Employees

1. **Viewing Employees**
   
   To access the employee management interface:
   
   - Navigate to the "Employees" section from the main menu
   - Here you can see all library staff accounts
   - Use search to find specific employees by name or email

2. **Adding New Employees**
   
   To create a new staff account:
   
   - Click "Add Employee" button
   - Fill in the required information:
     - First and last name
     - Contact information (email, phone)
     - Address details
     - Role (Employee or Admin)
     - Initial password
   - The system will generate a unique employee code
   - Click "Save" to create the account

3. **Editing Employee Information**
   
   To update staff details:
   
   - Find the employee in the employees list
   - Click "Edit" on the employee you want to modify
   - Update the information as needed
   - Click "Save" to apply changes

4. **Managing Employee Access**
   
   To change an employee's system access:
   
   - Find the employee in the employees list
   - Click "Edit" on the employee
   - Modify their role between "Employee" and "Admin"
   - Save the changes to update permissions

5. **Deactivating Employees**
   
   When staff members leave the organization:
   
   - Find the employee in the employees list
   - Click "Deactivate" on the employee account
   - Confirm the deactivation
   - The account will be disabled but data will be preserved

#### System Management

1. **System Monitoring**
   
   To monitor system health:
   
   - Review login activity and access logs
   - Check for failed authentication attempts
   - Monitor system performance metrics
   - Review error reports

2. **Database Management**
   
   For database administration:
   
   - Coordinate with IT for database backups
   - Plan for data archiving of old records
   - Monitor database size and growth
   - Manage database performance

3. **System Updates**
   
   When system updates are available:
   
   - Review release notes for new features
   - Plan for update deployment
   - Test updates in a staging environment
   - Coordinate with IT for production deployment

#### Advanced Features

1. **Reporting and Analytics**
   
   Access advanced system reports:
   
   - Library usage statistics
   - Member activity metrics
   - Collection utilization data
   - Document popularity rankings
   - Loan duration analytics

2. **Data Export**
   
   Export system data for external use:
   
   - Generate CSV/Excel reports
   - Create data backups
   - Export membership information
   - Prepare collection inventories

3. **System Configuration**
   
   Customize system settings:
   
   - Set loan duration defaults
   - Configure reservation policies
   - Adjust system notifications
   - Manage system-wide announcements

#### Troubleshooting

1. **Common Issues**
   
   Address frequently encountered problems:
   
   - Login and authentication issues
   - Document availability discrepancies
   - Reservation conflicts
   - Data synchronization problems

2. **Error Resolution**
   
   Resolve system errors:
   
   - Identify error source from logs
   - Apply recommended fixes
   - Restart services if necessary
   - Contact system support for persistent issues

3. **User Support**
   
   Provide assistance to staff and members:
   
   - Reset passwords when needed
   - Train staff on system features
   - Document common procedures
   - Create help resources and guides

## Features Documentation

### Catalog Management

The Catalog Management system is a core component of Library Sphere, providing functionality for browsing, searching, and managing the library's collection of documents.

#### Overview

The catalog system offers a rich, interactive interface for exploring the library's collection with the following capabilities:

- Browse the complete document collection
- Search by title, author, and description
- Filter by multiple criteria
- View detailed document information
- Check document availability status
- Perform document-related actions based on user role

#### Implementation Details

1. **Catalog Page Component**
   
   The catalog is implemented in `src/app/catalog/page.jsx` as a client-side component with the following structure:
   
   - State management for documents, filters, and search
   - Fetch API integration for retrieving document data
   - Dynamic rendering based on document availability
   - Role-based action buttons
   - Responsive grid layout

2. **Data Fetching**
   
   Documents are retrieved from the backend using:
   
   ```javascript
   const response = await fetch("/api/documents?includeReservations=true");
   const data = await response.json();
   ```
   
   The `includeReservations` parameter ensures that reservation status is included in the response.

3. **Search Functionality**
   
   Search is implemented with client-side filtering:
   
   ```javascript
   // Apply search filter
   if (searchQuery) {
     const query = searchQuery.toLowerCase();
     results = results.filter(
       (doc) =>
         doc.title.toLowerCase().includes(query) ||
         doc.author.toLowerCase().includes(query) ||
         doc.description.toLowerCase().includes(query)
     );
   }
   ```

4. **Filtering System**
   
   The catalog supports filtering by:
   
   - Category (Novel, Comics, VideoGame, Film)
   - Age rating (Kids, Teens, Adults)
   - Genre (Action, Adventure, Comedy, etc.)
   
   Filters are implemented using shadcn/ui Select components and applied through client-side filtering:
   
   ```javascript
   // Apply category filter
   if (filters.category && filters.category !== "all-categories") {
     results = results.filter((doc) => doc.category === filters.category);
   }
   ```

5. **Document Cards**
   
   Each document is displayed as a card containing:
   
   - Cover image (with fallback for missing images)
   - Title and author
   - Category and age rating badges
   - Brief description
   - Status indicators
   - Action buttons (Loan, Reserve, Fulfill Reservation)

6. **Document Details Dialog**
   
   A modal dialog displays detailed document information when requested:
   
   - Full metadata (title, author, year, ISBN, etc.)
   - Complete description
   - Current availability status
   - Larger cover image
   
   Implemented using shadcn/ui Dialog component.

7. **Availability Status System**
   
   The catalog shows document availability with:
   
   - Visual indicators (badges)
   - Conditional action buttons
   - Status-specific messages
   
   Availability is determined by checking active loans:
   
   ```javascript
   const isAvailable = !document.loans?.some(loan => loan.status === 'Active');
   ```

8. **Action Buttons**
   
   The system dynamically renders appropriate action buttons:
   
   - "Loan" for available documents (members only)
   - "Reserve" for unavailable documents
   - "Fulfill Reservation" for staff when a reservation is pending
   
   Button visibility is controlled by role and document status:
   
   ```javascript
   const canFulfillReservation = isStaff && isAvailable && pendingReservation;
   ```

#### User Interactions

1. **Browsing**
   
   Users can:
   
   - Scroll through the paginated document grid
   - Apply filters to narrow down results
   - Search for specific terms
   - Reset filters to view all documents

2. **Document Actions**
   
   Members can:
   
   - Loan available documents
   - Reserve unavailable documents
   - View their current loans and reservations
   
   Staff can:
   
   - View document details
   - Fulfill reservations for members
   - See document status

3. **Responsive Design**
   
   The catalog adapts to different screen sizes:
   
   - Multi-column grid for desktop
   - Fewer columns for tablet
   - Single column for mobile
   - Responsive filters and search

#### Error Handling

The catalog includes comprehensive error handling:

1. **Loading States**
   
   - Initial loading indicator when fetching documents
   - Action-specific loading states on buttons
   - Disabled buttons during operations

2. **Error Notifications**
   
   - Toast messages for operation results
   - Specific error messages for different failure scenarios
   - Session expiration handling

3. **Fallbacks**
   
   - Placeholder image for missing document covers
   - Empty state for no search results
   - Error boundary for component failures

#### Performance Considerations

The catalog is optimized for performance:

1. **Efficient Rendering**
   
   - React Hooks for state management
   - Memoization of filtered results
   - Conditional rendering for dynamic elements

2. **Network Optimization**
   
   - Single initial API call for document data
   - Selective refetching after operations
   - Optimistic UI updates

3. **User Experience**
   
   - Debounced search input
   - Progressive loading of content
   - Instant feedback for user actions

### Loan Management

The Loan Management system handles the core library functionality of document borrowing and returning, providing a comprehensive solution for tracking and managing loans throughout their lifecycle.

#### Overview

The loan management system enables:

- Creating new loans for members
- Tracking active loans
- Processing document returns
- Enforcing loan business rules
- Managing loan status and due dates

#### Implementation Details

1. **Loan Data Model**
   
   The Loan entity is defined in the Prisma schema as:
   
   ```prisma
   model Loan {
     id                 String        @id @default(auto()) @map("_id") @db.ObjectId
     member             Member        @relation(fields: [memberId], references: [id])
     memberId           String        @db.ObjectId
     document           Document      @relation(fields: [documentId], references: [id])
     documentId         String        @db.ObjectId
     loanDate           DateTime      @default(now())
     expectedReturnDate DateTime
     actualReturnDate   DateTime?
     status             String        @default("Active") // Active, Returned
     createdAt          DateTime      @default(now())
     updatedAt          DateTime      @updatedAt

     @@unique([memberId, documentId, loanDate])
     @@index([documentId, status])
   }
   ```
   
   Key features of the model:
   - Relationships to Member and Document
   - Dates for loan creation and expected return
   - Optional actual return date
   - Status field to track loan state
   - Unique constraint to prevent duplicate loans
   - Index for efficient status querying

2. **Loan API Endpoints**
   
   Loan operations are handled by the `/api/loans` endpoint:
   
   - `GET /api/loans`: Retrieve loans with optional filtering
   - `POST /api/loans`: Create a new loan
   - `PUT /api/loans/:id`: Update a loan (e.g., mark as returned)
   - `DELETE /api/loans/:id`: Delete a loan (administrative function)

3. **Loan Creation Process**
   
   Creating a loan involves several validation steps:
   
   ```javascript
   // Check if document is available
   const existingActiveLoan = await prisma.loan.findFirst({
     where: {
       documentId,
       status: "Active"
     }
   });
   
   if (existingActiveLoan) {
     return res.status(400).json({ error: "Document is currently on loan" });
   }
   
   // Check for existing reservation
   const pendingReservation = await prisma.reservation.findFirst({
     where: {
       documentId,
       status: "Pending"
     }
   });
   
   if (pendingReservation && pendingReservation.memberId !== memberId) {
     return res.status(400).json({ error: "Document is reserved by another member" });
   }
   
   // Create the loan within a transaction
   const loan = await prisma.$transaction(async (tx) => {
     // Create the loan
     const newLoan = await tx.loan.create({
       data: {
         memberId,
         documentId,
         expectedReturnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
         status: "Active"
       }
     });
     
     // If there was a reservation by this member, mark it as fulfilled
     if (pendingReservation && pendingReservation.memberId === memberId) {
       await tx.reservation.update({
         where: { id: pendingReservation.id },
         data: { status: "Fulfilled" }
       });
     }
     
     return newLoan;
   });
   ```

4. **Loan Return Process**
   
   Returning a document updates the loan record:
   
   ```javascript
   const updatedLoan = await prisma.loan.update({
     where: { id },
     data: {
       status: "Returned",
       actualReturnDate: new Date()
     }
   });
   ```

5. **Loans Page Implementation**
   
   The Loans page (`src/app/loans/page.jsx`) provides:
   
   - Display of all active loans for the current user
   - Filtering and search capabilities
   - Return action for staff
   - Loan history view

#### Business Rules

1. **Document Availability**
   
   A document can be loaned if:
   
   - It has no active loans
   - It is not reserved by another member
   - The member doesn't already have the document on loan

2. **Loan Duration**
   
   - Default loan period is 14 days
   - The system calculates expected return dates automatically
   - Future enhancement may allow for configurable loan periods

3. **Loan Limits**
   
   - Members can only have one copy of a document at a time
   - Future enhancement may add maximum concurrent loans per member

4. **Staff Restrictions**
   
   - Staff members cannot loan documents to themselves
   - Staff can create loans for members
   - Staff can process returns

#### User Interfaces

1. **Catalog Integration**
   
   - "Loan" button on available documents
   - Availability status indicators
   - Toast notifications for loan operations

2. **Loans Page**
   
   - Lists all loans for the current user
   - For staff, shows all loans with member information
   - Provides filtering options (active, returned, by date)
   - Displays expected and actual return dates

3. **Account Page**
   
   - Shows current loans in the member profile
   - Provides quick access to loan information

#### Error Handling

The loan system implements comprehensive error handling:

1. **Validation Errors**
   
   - Document already on loan
   - Document reserved by another member
   - Invalid member or document IDs
   - Unauthorized access

2. **Transaction Safety**
   
   - Database transactions for atomic operations
   - Rollback on failure to maintain data integrity
   - Concurrency handling for race conditions

3. **User Feedback**
   
   - Clear error messages through toast notifications
   - Success confirmations for completed operations
   - Loading states during processing

#### Security Considerations

1. **Authentication and Authorization**
   
   - All loan endpoints require authenticated users
   - Members can only see and manage their own loans
   - Staff can view and manage all loans

2. **Validation**
   
   - Server-side validation of all loan operations
   - Prevention of duplicate loans
   - Input sanitization and type checking

3. **Audit Trail**
   
   - Creation and update timestamps for all loan records
   - Status tracking for loan lifecycle
   - Future enhancement may add detailed activity logging

### Reservation System

The Reservation System allows members to request documents that are currently unavailable, providing a fair and organized way to manage access to popular items in the library collection.

#### Overview

The reservation system enables:

- Requesting currently loaned documents
- Tracking pending, fulfilled, and cancelled reservations
- Prioritizing access based on reservation order
- Managing the reservation lifecycle
- Converting reservations to loans when items become available

#### Implementation Details

1. **Reservation Data Model**
   
   The Reservation entity is defined in the Prisma schema as:
   
   ```prisma
   model Reservation {
     id                 String        @id @default(auto()) @map("_id") @db.ObjectId
     member             Member        @relation(fields: [memberId], references: [id])
     memberId           String        @db.ObjectId
     document           Document      @relation(fields: [documentId], references: [id])
     documentId         String        @db.ObjectId
     reservationDate    DateTime      @default(now())
     expiryDate         DateTime
     status             String        // Pending, Fulfilled, Cancelled
     createdAt          DateTime      @default(now())
     updatedAt          DateTime      @updatedAt

     @@unique([memberId, documentId, reservationDate])
   }
   ```
   
   Key features of the model:
   - Relationships to Member and Document
   - Reservation creation date
   - Expiry date for time-limited holds
   - Status field to track reservation state
   - Unique constraint to prevent duplicate reservations

2. **Reservation API Endpoints**
   
   Reservation operations are handled by the `/api/reservations` endpoint:
   
   - `GET /api/reservations`: Retrieve reservations with optional filtering
   - `POST /api/reservations`: Create a new reservation
   - `PUT /api/reservations`: Update a reservation (fulfill or cancel)
   - `DELETE /api/reservations/:id`: Delete a reservation (administrative function)

3. **Reservation Creation Process**
   
   Creating a reservation involves several validation steps:
   
   ```javascript
   // Check if document exists
   const document = await prisma.document.findUnique({
     where: { id: documentId },
     include: {
       loans: {
         where: { status: "Active" }
       },
       reservations: {
         where: { status: "Pending" }
       }
     }
   });
   
   if (!document) {
     return res.status(404).json({ error: "Document not found" });
   }
   
   // Check if document is already available (no active loans)
   if (document.loans.length === 0) {
     return res.status(400).json({ error: "Document is available for loan, no need to reserve" });
   }
   
   // Check if user already has an active loan for this document
   const existingLoan = await prisma.loan.findFirst({
     where: {
       memberId,
       documentId,
       status: "Active"
     }
   });
   
   if (existingLoan) {
     return res.status(400).json({ error: "You already have this document on loan" });
   }
   
   // Check if user already has a pending reservation for this document
   const existingReservation = await prisma.reservation.findFirst({
     where: {
       memberId,
       documentId,
       status: "Pending"
     }
   });
   
   if (existingReservation) {
     return res.status(400).json({ error: "You already have a pending reservation for this document" });
   }
   
   // Create the reservation
   const reservation = await prisma.reservation.create({
     data: {
       memberId,
       documentId,
       expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
       status: "Pending"
     }
   });
   ```

4. **Reservation Fulfillment Process**
   
   When a document becomes available, staff can fulfill a reservation:
   
   ```javascript
   // Transaction to fulfill reservation and create loan
   const result = await prisma.$transaction(async (tx) => {
     // Mark the reservation as fulfilled
     const updatedReservation = await tx.reservation.update({
       where: { id: reservationId },
       data: { status: "Fulfilled" },
       include: { member: true, document: true }
     });
     
     // Create a new loan for the member
     const loan = await tx.loan.create({
       data: {
         memberId: updatedReservation.memberId,
         documentId: updatedReservation.documentId,
         expectedReturnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
         status: "Active"
       }
     });
     
     return { updatedReservation, loan };
   });
   ```

5. **Reservation Cancellation**
   
   Members or staff can cancel pending reservations:
   
   ```javascript
   const updatedReservation = await prisma.reservation.update({
     where: { id: reservationId },
     data: { status: "Cancelled" }
   });
   ```

6. **Reservations Page Implementation**
   
   The Reservations page (`src/app/reservations/page.jsx`) provides:
   
   - Display of all reservations for the current user
   - For staff, a view of all pending reservations
   - Fulfill and cancel actions based on user role
   - Status indicators for pending, fulfilled, and cancelled reservations

#### Business Rules

1. **Reservation Eligibility**
   
   A document can be reserved if:
   
   - It is currently on loan (not available)
   - The member doesn't already have it on loan
   - The member doesn't already have a pending reservation for it

2. **Reservation Duration**
   
   - Default reservation hold period is 7 days after the document becomes available
   - The system calculates expiry dates automatically
   - Future enhancement may allow for configurable hold periods

3. **Reservation Limits**
   
   - Members can only have one pending reservation per document
   - Future enhancement may add maximum concurrent reservations per member

4. **Reservation Priority**
   
   - Reservations are fulfilled on a first-come, first-served basis
   - When a document is returned, the system identifies if there are pending reservations
   - Staff are notified of documents with pending reservations

#### User Interfaces

1. **Catalog Integration**
   
   - "Reserve" button on unavailable documents
   - Reservation status indicators on document cards
   - Toast notifications for reservation operations

2. **Reservations Page**
   
   - Lists all reservations for the current user
   - For staff, shows all reservations with member information
   - Provides filtering options (pending, fulfilled, cancelled)
   - Shows reservation date and expiry date

3. **Account Page**
   
   - Shows current reservations in the member profile
   - Provides quick access to reservation status

#### Staff Functions

1. **Fulfillment Workflow**
   
   Staff can fulfill reservations through:
   
   - The Reservations page
   - The Catalog page when viewing a document with pending reservations
   - Automatic prompts when returning a document with pending reservations

2. **Reservation Management**
   
   Staff can:
   
   - View all pending reservations
   - Cancel reservations when necessary
   - See reservation history for members
   - Monitor reservation expirations

#### Error Handling

The reservation system implements comprehensive error handling:

1. **Validation Errors**
   
   - Document already available
   - Document already on loan to the member
   - Document already reserved by the member
   - Invalid member or document IDs

2. **Transaction Safety**
   
   - Database transactions for reservation fulfillment
   - Atomicity for reservation-to-loan conversion
   - Concurrency handling for simultaneous operations

3. **User Feedback**
   
   - Specific error messages for different scenarios
   - Success notifications for reservation operations
   - Visual indicators of reservation status

#### Performance and Security

1. **Optimized Queries**
   
   - Efficient database queries for reservation status checks
   - Minimal database operations for common actions
   - Transaction use only where necessary

2. **Security Measures**
   
   - Authentication required for all reservation operations
   - Authorization checks for different user roles
   - Data validation to prevent invalid reservations

3. **Scalability Considerations**
   
   - Indexing for efficient reservation lookups
   - Pagination for libraries with many reservations
   - Status-based filtering to reduce data transfer

### Member Management

The Member Management system handles all aspects of library patron accounts, including registration, profile management, and activity tracking.

#### Overview

The member management system enables:

- Managing library patron accounts
- Tracking member personal information
- Monitoring member activity (loans and reservations)
- Managing member authentication
- Enforcing member-specific business rules

#### Implementation Details

1. **Member Data Model**
   
   The Member entity is defined in the Prisma schema as:
   
   ```prisma
   model Member {
     id                 String        @id @default(auto()) @map("_id") @db.ObjectId
     code               String        @unique
     firstName          String
     lastName           String
     street             String
     city               String
     province           String
     phone              String
     email              String        @unique
     password           String
     createdAt          DateTime      @default(now())
     updatedAt          DateTime      @updatedAt
     loans              Loan[]
     reservations       Reservation[]
   }
   ```
   
   Key features of the model:
   - Unique member code for identification
   - Personal and contact information
   - Email and password for authentication
   - Relationships to loans and reservations
   - Timestamps for creation and updates

2. **Member API Endpoints**
   
   Member operations are handled by the `/api/members` endpoint:
   
   - `GET /api/members`: Retrieve members with optional filtering
   - `GET /api/members/:id`: Get a specific member's details
   - `POST /api/members`: Create a new member
   - `PUT /api/members/:id`: Update member information
   - `DELETE /api/members/:id`: Delete a member (administrative function)

3. **Member Authentication**
   
   Members authenticate using NextAuth.js with a credentials provider:
   
   ```javascript
   // NextAuth configuration
   export const authOptions = {
     providers: [
       CredentialsProvider({
         name: "Credentials",
         credentials: {
           email: { label: "Email", type: "email" },
           password: { label: "Password", type: "password" },
           role: { label: "Role", type: "text" }
         },
         async authorize(credentials) {
           if (!credentials?.email || !credentials?.password || !credentials?.role) {
             return null;
           }
           
           // Check if logging in as a member
           if (credentials.role === "member") {
             const member = await prisma.member.findUnique({
               where: { email: credentials.email }
             });
             
             if (!member) return null;
             
             const passwordMatch = await bcrypt.compare(credentials.password, member.password);
             
             if (!passwordMatch) return null;
             
             return {
               id: member.id,
               email: member.email,
               name: `${member.firstName} ${member.lastName}`,
               role: "member"
             };
           }
           
           // Employee login logic...
         }
       })
     ],
     // Session configuration...
   };
   ```

4. **Member Registration**
   
   Creating a new member account:
   
   ```javascript
   // Generate unique member code
   const memberCode = generateMemberCode();
   
   // Hash password
   const hashedPassword = await bcrypt.hash(password, 10);
   
   // Create member
   const member = await prisma.member.create({
     data: {
       code: memberCode,
       firstName,
       lastName,
       street,
       city,
       province,
       phone,
       email,
       password: hashedPassword
     }
   });
   ```

5. **Members Page Implementation**
   
   The Members page (`src/app/members/page.jsx`) provides:
   
   - List of all library members (staff-only view)
   - Search and filtering capabilities
   - Member detail view
   - Edit and delete functions
   - Activity summary

#### Business Rules

1. **Member Uniqueness**
   
   - Each member has a unique email address
   - Each member has a unique identifying code
   - Duplicate registrations are prevented

2. **Password Security**
   
   - Passwords are hashed using bcrypt
   - Minimum password strength requirements
   - Secure password reset process

3. **Access Controls**
   
   - Members can only view and edit their own information
   - Staff can view all member information
   - Only administrators can delete member accounts

4. **Activity Restrictions**
   
   - Members with overdue items may have borrowing restricted
   - Maximum concurrent loans and reservations
   - Account status tracking (active, suspended, etc.)

#### User Interfaces

1. **Member Profile**
   
   - Account page for viewing personal information
   - Profile edit functionality
   - Activity summary (current loans and reservations)
   - Account status indicators

2. **Staff Member Management**
   
   - Members list with search and filtering
   - Member detail view with full history
   - Member creation and editing interface
   - Activity management (override restrictions, etc.)

3. **Registration Form**
   
   - New member registration interface
   - Form validation and error handling
   - Confirmation process

#### Data Management

1. **Personal Information**
   
   Personal data is handled with privacy considerations:
   
   - Only necessary information is collected
   - Access to personal data is restricted
   - Data is protected through authentication
   - Future enhancement may include data anonymization options

2. **Activity Tracking**
   
   Member activity is tracked for:
   
   - Current and past loans
   - Reservation history
   - Login activity (future enhancement)
   - Account modifications

3. **Data Integrity**
   
   Member data is protected through:
   
   - Input validation
   - Referential integrity with related entities
   - Proper error handling
   - Backup and recovery procedures

#### Security Considerations

1. **Authentication**
   
   - Secure login process
   - Session management via NextAuth.js
   - Protection against common attacks (brute force, etc.)

2. **Authorization**
   
   - Role-based access control
   - Path-based route protection
   - API endpoint security

3. **Data Protection**
   
   - Password hashing
   - HTTPS for all communications
   - Protection against sensitive data exposure

#### User Experience Features

1. **Self-Service**
   
   - Members can update their own contact information
   - Password change functionality
   - Activity history viewing

2. **Notifications**
   
   - Future enhancement: email notifications for account changes
   - Success and error messages for operations
   - Status updates for account actions

3. **Accessibility**
   
   - Keyboard navigation support
   - Screen reader compatibility
   - Responsive design for all devices

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