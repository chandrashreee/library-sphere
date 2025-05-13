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

### Staff Administration

The Staff Administration system manages library employees and administrators, providing tools for account management, access control, and administrative functions.

#### Overview

The staff administration system enables:

- Managing employee accounts with different roles
- Controlling access to administrative functions
- Providing staff-specific interfaces and workflows
- Separating staff and member access
- Supporting administrative oversight

#### Implementation Details

1. **Employee Data Model**
   
   The Employee entity is defined in the Prisma schema as:
   
   ```prisma
   model Employee {
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
     role               String        // employee or admin
     createdAt          DateTime      @default(now())
     updatedAt          DateTime      @updatedAt
   }
   ```
   
   Key features of the model:
   - Unique employee code for identification
   - Personal and contact information
   - Email and password for authentication
   - Role field to distinguish between regular employees and administrators
   - Timestamps for creation and updates

2. **Employee API Endpoints**
   
   Employee operations are handled by the `/api/employees` endpoint:
   
   - `GET /api/employees`: Retrieve employees with optional filtering
   - `GET /api/employees/:id`: Get a specific employee's details
   - `POST /api/employees`: Create a new employee
   - `PUT /api/employees/:id`: Update employee information
   - `DELETE /api/employees/:id`: Delete an employee (admin-only)

3. **Staff Authentication**
   
   Staff authenticate using NextAuth.js with a credentials provider:
   
   ```javascript
   // NextAuth configuration for staff
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
           
           // Member login logic...
           
           // Check if logging in as staff
           if (credentials.role === "staff") {
             const employee = await prisma.employee.findUnique({
               where: { email: credentials.email }
             });
             
             if (!employee) return null;
             
             const passwordMatch = await bcrypt.compare(credentials.password, employee.password);
             
             if (!passwordMatch) return null;
             
             return {
               id: employee.id,
               email: employee.email,
               name: `${employee.firstName} ${employee.lastName}`,
               role: employee.role // 'employee' or 'admin'
             };
           }
         }
       })
     ],
     callbacks: {
       jwt: async ({ token, user }) => {
         if (user) {
           token.id = user.id;
           token.role = user.role;
         }
         return token;
       },
       session: async ({ session, token }) => {
         if (token) {
           session.user.id = token.id;
           session.user.role = token.role;
         }
         return session;
       }
     },
     // Additional configuration...
   };
   ```

4. **Role-Based Access Control**
   
   Role-based permissions are enforced at multiple levels:
   
   ```javascript
   // Middleware for protected API routes
   export async function apiAuthMiddleware(req, res, next) {
     const session = await getServerSession(req, res, authOptions);
     
     if (!session) {
       return res.status(401).json({ error: "Unauthorized" });
     }
     
     // Check for admin-only routes
     if (req.url.startsWith("/api/employees") && req.method !== "GET") {
       if (session.user.role !== "admin") {
         return res.status(403).json({ error: "Admin privileges required" });
       }
     }
     
     req.user = session.user;
     return next();
   }
   ```

5. **Employees Page Implementation**
   
   The Employees page (`src/app/employees/page.jsx`) provides:
   
   - List of all library staff (admin-only view)
   - Search and filtering capabilities
   - Staff detail view
   - Role management
   - Add, edit, and delete functions

#### Business Rules

1. **Staff Roles**
   
   The system supports two staff roles:
   
   - **Employee**: Regular staff with document, loan, and member management abilities
   - **Admin**: Administrators with additional employee management and system configuration capabilities

2. **Role Permissions**
   
   Access permissions are structured hierarchically:
   
   - Regular employees can:
     - View and manage documents
     - Process loans and returns
     - View and manage member accounts
     - Process reservations
   
   - Administrators can perform all employee functions plus:
     - Manage employee accounts
     - Change employee roles
     - Access system configuration
     - View system reports and statistics

3. **Account Security**
   
   Staff account security is prioritized:
   
   - Strong password requirements
   - Role separation for administrative actions
   - Audit logging for sensitive operations
   - Session management with appropriate timeouts

#### User Interfaces

1. **Staff Dashboard**
   
   - Role-specific dashboard view
   - Quick access to common functions
   - Activity statistics and pending actions
   - Navigation to administrative areas

2. **Employee Management Interface**
   
   Admin-only interface for:
   
   - Viewing all employees
   - Adding new staff accounts
   - Modifying existing accounts
   - Role assignment
   - Account deactivation

3. **Administrative Tools**
   
   Additional interfaces for system management:
   
   - System logs and activity reports
   - Circulation statistics
   - Collection management tools
   - Configuration settings

#### Implementation Patterns

1. **Component Access Control**
   
   UI components are conditionally rendered based on role:
   
   ```javascript
   // Example of role-based UI rendering
   {session?.user.role === "admin" && (
     <Button onClick={openEmployeeManagement}>
       Manage Employees
     </Button>
   )}
   ```

2. **Route Protection**
   
   Routes are protected using middleware:
   
   ```javascript
   // Middleware.js - Protecting admin routes
   export function middleware(request) {
     const { pathname } = request.nextUrl;
     
     // Get session from cookie
     const session = getSessionFromCookie(request);
     
     // Protect employee management routes
     if (pathname.startsWith("/employees") && (!session || session.user.role !== "admin")) {
       return NextResponse.redirect(new URL("/login", request.url));
     }
     
     return NextResponse.next();
   }
   ```

3. **API Authorization**
   
   API endpoints verify appropriate permissions:
   
   ```javascript
   // Employee API route handler
   export async function handler(req, res) {
     const session = await getServerSession(req, res, authOptions);
     
     // Check authentication
     if (!session) {
       return res.status(401).json({ error: "Unauthorized" });
     }
     
     // Admin-only operations
     if (req.method !== "GET" && session.user.role !== "admin") {
       return res.status(403).json({ error: "Admin privileges required" });
     }
     
     // Process the request...
   }
   ```

#### Security Considerations

1. **Principle of Least Privilege**
   
   - Staff accounts have only the permissions needed for their role
   - Critical operations require elevated privileges
   - Sensitive data access is restricted

2. **Administrative Safeguards**
   
   - Critical actions require confirmation
   - Account lockout after failed authentication attempts
   - Session timeout for inactivity

3. **Audit and Compliance**
   
   - Actions by staff are tracked
   - Administrative operations are logged
   - Password policies enforced
   - Regular security reviews

#### User Experience for Staff

1. **Efficient Workflows**
   
   - Streamlined interfaces for common tasks
   - Batch operations for efficiency
   - Keyboard shortcuts for frequent actions
   - Quick search and filters for finding information

2. **Role-Appropriate Information**
   
   - Dashboards customized to role needs
   - Relevant notifications and alerts
   - Task prioritization based on role
   - Access to appropriate reports and statistics

3. **Training and Support**
   
   - Intuitive interface design
   - Contextual help and tooltips
   - Clear error messages and resolution steps
   - Future enhancement: integrated help system

## API Reference

The Library Sphere API provides a set of RESTful endpoints for interacting with the system's core resources. This reference documents the available endpoints, their parameters, request formats, and response structures.

### Authentication Endpoints

The authentication system is powered by NextAuth.js and provides endpoints for session management and user authentication.

#### `/api/auth/[...nextauth]`

NextAuth.js handles multiple authentication-related routes under this path.

**Available Operations:**

- **POST `/api/auth/signin`**: Authenticate a user
- **GET `/api/auth/session`**: Get current session data
- **POST `/api/auth/signout`**: Sign out a user
- **GET `/api/auth/csrf`**: Get CSRF token

**Authentication Request Example:**

```javascript
// Example authentication request
const response = await fetch("/api/auth/signin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
    role: "member", // or "staff" for employees
    csrfToken: "csrf_token_here"
  })
});
```

**Response Format:**

```json
{
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "member"
  },
  "expires": "2023-12-31T23:59:59.999Z"
}
```

**Authentication Error Codes:**

| Status Code | Description |
|-------------|-------------|
| 401 | Invalid credentials |
| 400 | Missing credentials |
| 500 | Authentication server error |

### Document Endpoints

These endpoints manage the library's document collection, providing CRUD operations for books, comics, video games, and films.

#### `GET /api/documents`

Retrieves a list of documents with optional filtering.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category (Novel, Comics, VideoGame, Film) |
| `ageRating` | string | Filter by age rating (Kids, Teens, Adults) |
| `genre` | string | Filter by genre |
| `available` | boolean | Filter by availability status |
| `search` | string | Search in title, author, and description |
| `includeLoans` | boolean | Include loan information in the response |
| `includeReservations` | boolean | Include reservation information in the response |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page for pagination |

**Response Example:**

```json
{
  "data": [
    {
      "id": "document_id",
      "title": "Document Title",
      "author": "Author Name",
      "year": 2023,
      "category": "Novel",
      "ageRating": "Teens",
      "genre": "Fantasy",
      "description": "Description text...",
      "isbn": "978-3-16-148410-0",
      "libraryCode": "NOV-FAN-001",
      "loans": [],
      "reservations": []
    },
    // More documents...
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

#### `GET /api/documents/:id`

Retrieves a specific document by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `includeLoans` | boolean | Include loan information |
| `includeReservations` | boolean | Include reservation information |

**Response Example:**

```json
{
  "data": {
    "id": "document_id",
    "title": "Document Title",
    "author": "Author Name",
    "year": 2023,
    "category": "Novel",
    "ageRating": "Teens",
    "genre": "Fantasy",
    "description": "Description text...",
    "isbn": "978-3-16-148410-0",
    "libraryCode": "NOV-FAN-001",
    "loans": [
      {
        "id": "loan_id",
        "memberId": "member_id",
        "loanDate": "2023-01-15T00:00:00.000Z",
        "expectedReturnDate": "2023-01-29T00:00:00.000Z",
        "status": "Active"
      }
    ],
    "reservations": []
  }
}
```

#### `POST /api/documents`

Creates a new document. Requires staff authentication.

**Request Body:**

```json
{
  "title": "New Document Title",
  "author": "Author Name",
  "year": 2023,
  "category": "Novel",
  "ageRating": "Teens",
  "genre": "Fantasy",
  "description": "Description of the document...",
  "isbn": "978-3-16-148410-0",
  "coverImage": "url_to_image" // Optional
}
```

**Response Example:**

```json
{
  "data": {
    "id": "new_document_id",
    "title": "New Document Title",
    "author": "Author Name",
    "year": 2023,
    "category": "Novel",
    "ageRating": "Teens",
    "genre": "Fantasy",
    "description": "Description of the document...",
    "isbn": "978-3-16-148410-0",
    "libraryCode": "NOV-FAN-002", // Generated automatically
    "createdAt": "2023-02-20T12:34:56.789Z",
    "updatedAt": "2023-02-20T12:34:56.789Z"
  },
  "message": "Document created successfully"
}
```

#### `PUT /api/documents/:id`

Updates an existing document. Requires staff authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

**Request Body:**

```json
{
  "title": "Updated Document Title",
  "author": "Updated Author Name",
  "description": "Updated description...",
  // Include only fields to update
}
```

**Response Example:**

```json
{
  "data": {
    "id": "document_id",
    "title": "Updated Document Title",
    "author": "Updated Author Name",
    "description": "Updated description...",
    // All document fields...
    "updatedAt": "2023-02-21T09:12:34.567Z"
  },
  "message": "Document updated successfully"
}
```

#### `DELETE /api/documents/:id`

Deletes a document. Requires staff authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

**Response Example:**

```json
{
  "message": "Document deleted successfully"
}
```

**Document API Error Codes:**

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request data |
| 401 | Unauthorized access |
| 403 | Insufficient permissions |
| 404 | Document not found |
| 409 | Document has active loans |
| 500 | Server error |

### Loan Endpoints

These endpoints manage document loans, providing functionality for borrowing and returning library materials.

#### `GET /api/loans`

Retrieves a list of loans with optional filtering.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `memberId` | string | Filter by member ID |
| `documentId` | string | Filter by document ID |
| `status` | string | Filter by status (Active, Returned) |
| `includeDocument` | boolean | Include document details |
| `includeMember` | boolean | Include member details |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page for pagination |

**Response Example:**

```json
{
  "data": [
    {
      "id": "loan_id",
      "memberId": "member_id",
      "documentId": "document_id",
      "loanDate": "2023-01-15T00:00:00.000Z",
      "expectedReturnDate": "2023-01-29T00:00:00.000Z",
      "actualReturnDate": null,
      "status": "Active",
      "document": {
        "id": "document_id",
        "title": "Document Title",
        "author": "Author Name",
        // Other document details...
      },
      "member": {
        "id": "member_id",
        "firstName": "John",
        "lastName": "Doe",
        // Other member details...
      }
    },
    // More loans...
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

#### `GET /api/loans/:id`

Retrieves a specific loan by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Loan ID |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `includeDocument` | boolean | Include document details |
| `includeMember` | boolean | Include member details |

**Response Example:**

```json
{
  "data": {
    "id": "loan_id",
    "memberId": "member_id",
    "documentId": "document_id",
    "loanDate": "2023-01-15T00:00:00.000Z",
    "expectedReturnDate": "2023-01-29T00:00:00.000Z",
    "actualReturnDate": null,
    "status": "Active",
    "document": {
      // Document details...
    },
    "member": {
      // Member details...
    }
  }
}
```

#### `POST /api/loans`

Creates a new loan. Requires authentication.

**Request Body:**

```json
{
  "memberId": "member_id",
  "documentId": "document_id"
}
```

**Response Example:**

```json
{
  "data": {
    "id": "new_loan_id",
    "memberId": "member_id",
    "documentId": "document_id",
    "loanDate": "2023-02-20T12:34:56.789Z",
    "expectedReturnDate": "2023-03-06T12:34:56.789Z",
    "status": "Active",
    "createdAt": "2023-02-20T12:34:56.789Z",
    "updatedAt": "2023-02-20T12:34:56.789Z"
  },
  "message": "Loan created successfully"
}
```

#### `PUT /api/loans/:id`

Updates a loan, typically used for returns. Requires authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Loan ID |

**Request Body:**

```json
{
  "status": "Returned"
}
```

**Response Example:**

```json
{
  "data": {
    "id": "loan_id",
    "memberId": "member_id",
    "documentId": "document_id",
    "loanDate": "2023-01-15T00:00:00.000Z",
    "expectedReturnDate": "2023-01-29T00:00:00.000Z",
    "actualReturnDate": "2023-01-28T10:15:30.123Z",
    "status": "Returned",
    "updatedAt": "2023-01-28T10:15:30.123Z"
  },
  "message": "Loan updated successfully"
}
```

**Loan API Error Codes:**

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request data |
| 401 | Unauthorized access |
| 403 | Insufficient permissions |
| 404 | Loan not found |
| 409 | Document unavailable or already on loan |
| 500 | Server error |

### Reservation Endpoints

These endpoints manage document reservations, allowing members to request currently unavailable documents.

#### `GET /api/reservations`

Retrieves a list of reservations with optional filtering.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `memberId` | string | Filter by member ID |
| `documentId` | string | Filter by document ID |
| `status` | string | Filter by status (Pending, Fulfilled, Cancelled) |
| `includeDocument` | boolean | Include document details |
| `includeMember` | boolean | Include member details |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page for pagination |

**Response Example:**

```json
{
  "data": [
    {
      "id": "reservation_id",
      "memberId": "member_id",
      "documentId": "document_id",
      "reservationDate": "2023-02-01T00:00:00.000Z",
      "expiryDate": "2023-02-08T00:00:00.000Z",
      "status": "Pending",
      "document": {
        // Document details...
      },
      "member": {
        // Member details...
      }
    },
    // More reservations...
  ],
  "pagination": {
    "total": 30,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

#### `GET /api/reservations/:id`

Retrieves a specific reservation by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Reservation ID |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `includeDocument` | boolean | Include document details |
| `includeMember` | boolean | Include member details |

**Response Example:**

```json
{
  "data": {
    "id": "reservation_id",
    "memberId": "member_id",
    "documentId": "document_id",
    "reservationDate": "2023-02-01T00:00:00.000Z",
    "expiryDate": "2023-02-08T00:00:00.000Z",
    "status": "Pending",
    "document": {
      // Document details...
    },
    "member": {
      // Member details...
    }
  }
}
```

#### `POST /api/reservations`

Creates a new reservation. Requires authentication.

**Request Body:**

```json
{
  "memberId": "member_id",
  "documentId": "document_id"
}
```

**Response Example:**

```json
{
  "data": {
    "id": "new_reservation_id",
    "memberId": "member_id",
    "documentId": "document_id",
    "reservationDate": "2023-02-20T12:34:56.789Z",
    "expiryDate": "2023-02-27T12:34:56.789Z",
    "status": "Pending",
    "createdAt": "2023-02-20T12:34:56.789Z",
    "updatedAt": "2023-02-20T12:34:56.789Z"
  },
  "message": "Reservation created successfully"
}
```

#### `PUT /api/reservations/:id`

Updates a reservation status. Requires authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Reservation ID |

**Request Body:**

```json
{
  "status": "Fulfilled" // or "Cancelled"
}
```

**Response Example:**

```json
{
  "data": {
    "id": "reservation_id",
    "memberId": "member_id",
    "documentId": "document_id",
    "reservationDate": "2023-02-01T00:00:00.000Z",
    "expiryDate": "2023-02-08T00:00:00.000Z",
    "status": "Fulfilled",
    "updatedAt": "2023-02-05T15:45:12.345Z"
  },
  "message": "Reservation updated successfully"
}
```

**Reservation API Error Codes:**

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request data |
| 401 | Unauthorized access |
| 403 | Insufficient permissions |
| 404 | Reservation not found |
| 409 | Document already available or already reserved |
| 500 | Server error |

### Member Endpoints

These endpoints manage library members, providing functionality for member account operations.

#### `GET /api/members`

Retrieves a list of members. Requires staff authentication.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by name, email, or code |
| `includeLoans` | boolean | Include loan information |
| `includeReservations` | boolean | Include reservation information |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page for pagination |

**Response Example:**

```json
{
  "data": [
    {
      "id": "member_id",
      "code": "MEMBER001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "555-123-4567",
      "street": "123 Main St",
      "city": "Anytown",
      "province": "State",
      "loans": [],
      "reservations": []
    },
    // More members...
  ],
  "pagination": {
    "total": 200,
    "page": 1,
    "limit": 10,
    "pages": 20
  }
}
```

#### `GET /api/members/:id`

Retrieves a specific member by ID. Members can access their own data, staff can access any member.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Member ID |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `includeLoans` | boolean | Include loan information |
| `includeReservations` | boolean | Include reservation information |

**Response Example:**

```json
{
  "data": {
    "id": "member_id",
    "code": "MEMBER001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-4567",
    "street": "123 Main St",
    "city": "Anytown",
    "province": "State",
    "loans": [
      // Loan details...
    ],
    "reservations": [
      // Reservation details...
    ]
  }
}
```

#### `POST /api/members`

Creates a new member. Staff can create members directly, or this can be part of a registration flow.

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "password": "securepassword",
  "phone": "555-987-6543",
  "street": "456 Oak Ave",
  "city": "Othertown",
  "province": "State"
}
```

**Response Example:**

```json
{
  "data": {
    "id": "new_member_id",
    "code": "MEMBER002", // Generated automatically
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "555-987-6543",
    "street": "456 Oak Ave",
    "city": "Othertown",
    "province": "State",
    "createdAt": "2023-02-20T12:34:56.789Z",
    "updatedAt": "2023-02-20T12:34:56.789Z"
  },
  "message": "Member created successfully"
}
```

#### `PUT /api/members/:id`

Updates a member. Members can update their own data, staff can update any member.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Member ID |

**Request Body:**

```json
{
  "phone": "555-111-2222",
  "street": "789 Pine St",
  "city": "Newtown",
  // Include only fields to update
}
```

**Response Example:**

```json
{
  "data": {
    "id": "member_id",
    "code": "MEMBER001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "555-111-2222",
    "street": "789 Pine St",
    "city": "Newtown",
    "province": "State",
    "updatedAt": "2023-02-21T09:12:34.567Z"
  },
  "message": "Member updated successfully"
}
```

#### `DELETE /api/members/:id`

Deletes a member. Requires staff authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Member ID |

**Response Example:**

```json
{
  "message": "Member deleted successfully"
}
```

**Member API Error Codes:**

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request data |
| 401 | Unauthorized access |
| 403 | Insufficient permissions |
| 404 | Member not found |
| 409 | Email already exists |
| 409 | Member has active loans |
| 500 | Server error |

### Employee Endpoints

These endpoints manage library staff, providing functionality for employee account operations.

#### `GET /api/employees`

Retrieves a list of employees. Requires admin authentication.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by name, email, or code |
| `role` | string | Filter by role (employee, admin) |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page for pagination |

**Response Example:**

```json
{
  "data": [
    {
      "id": "employee_id",
      "code": "EMP001",
      "firstName": "Robert",
      "lastName": "Taylor",
      "email": "robert.taylor@library.com",
      "phone": "555-333-4444",
      "street": "321 Library Lane",
      "city": "Booktown",
      "province": "State",
      "role": "employee"
    },
    // More employees...
  ],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 10,
    "pages": 2
  }
}
```

#### `GET /api/employees/:id`

Retrieves a specific employee by ID. Employees can access their own data, admins can access any employee.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Employee ID |

**Response Example:**

```json
{
  "data": {
    "id": "employee_id",
    "code": "EMP001",
    "firstName": "Robert",
    "lastName": "Taylor",
    "email": "robert.taylor@library.com",
    "phone": "555-333-4444",
    "street": "321 Library Lane",
    "city": "Booktown",
    "province": "State",
    "role": "employee",
    "createdAt": "2022-12-15T00:00:00.000Z",
    "updatedAt": "2023-01-10T00:00:00.000Z"
  }
}
```

#### `POST /api/employees`

Creates a new employee. Requires admin authentication.

**Request Body:**

```json
{
  "firstName": "Sarah",
  "lastName": "Davis",
  "email": "sarah.davis@library.com",
  "password": "securepassword",
  "phone": "555-555-6666",
  "street": "654 Book Blvd",
  "city": "Libraryville",
  "province": "State",
  "role": "admin"
}
```

**Response Example:**

```json
{
  "data": {
    "id": "new_employee_id",
    "code": "EMP002", // Generated automatically
    "firstName": "Sarah",
    "lastName": "Davis",
    "email": "sarah.davis@library.com",
    "phone": "555-555-6666",
    "street": "654 Book Blvd",
    "city": "Libraryville",
    "province": "State",
    "role": "admin",
    "createdAt": "2023-02-20T12:34:56.789Z",
    "updatedAt": "2023-02-20T12:34:56.789Z"
  },
  "message": "Employee created successfully"
}
```

#### `PUT /api/employees/:id`

Updates an employee. Employees can update their own data (except role), admins can update any employee.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Employee ID |

**Request Body:**

```json
{
  "phone": "555-777-8888",
  "role": "admin" // Only admins can change roles
  // Include only fields to update
}
```

**Response Example:**

```json
{
  "data": {
    "id": "employee_id",
    "code": "EMP001",
    "firstName": "Robert",
    "lastName": "Taylor",
    "email": "robert.taylor@library.com",
    "phone": "555-777-8888",
    "street": "321 Library Lane",
    "city": "Booktown",
    "province": "State",
    "role": "admin",
    "updatedAt": "2023-02-21T09:12:34.567Z"
  },
  "message": "Employee updated successfully"
}
```

#### `DELETE /api/employees/:id`

Deletes an employee. Requires admin authentication.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Employee ID |

**Response Example:**

```json
{
  "message": "Employee deleted successfully"
}
```

**Employee API Error Codes:**

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request data |
| 401 | Unauthorized access |
| 403 | Insufficient permissions |
| 404 | Employee not found |
| 409 | Email already exists |
| 500 | Server error |

### API Best Practices

When using the Library Sphere API, follow these best practices:

1. **Authentication**
   - Always include appropriate authentication tokens in your requests
   - Store tokens securely and handle expiration gracefully
   - Use role-specific endpoints according to your permissions

2. **Error Handling**
   - Check HTTP status codes for operation success
   - Parse error responses for detailed error information
   - Implement appropriate retry logic for temporary failures

3. **Pagination**
   - Use pagination parameters for endpoints that return lists
   - Respect pagination limits to avoid performance issues
   - Implement proper page navigation in your UI

4. **Data Validation**
   - Validate input data before sending requests
   - Handle validation errors gracefully
   - Follow the data formats specified in this documentation

5. **Performance**
   - Use appropriate include parameters to minimize the number of requests
   - Cache frequently accessed data when appropriate
   - Implement optimistic UI updates for better user experience

## Database Schema

The Library Sphere system uses MongoDB as its database, with the Prisma ORM providing the schema definition and database access. This section details the data models and their relationships.

### Member Model

The Member model represents library patrons who can borrow documents.

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

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (MongoDB ObjectId) |
| `code` | String | Unique member code for identification |
| `firstName` | String | Member's first name |
| `lastName` | String | Member's last name |
| `street` | String | Street address |
| `city` | String | City of residence |
| `province` | String | State/province of residence |
| `phone` | String | Contact phone number |
| `email` | String | Unique email address (used for login) |
| `password` | String | Hashed password for authentication |
| `createdAt` | DateTime | Account creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relationships:**
- One-to-many relationship with `Loan` (one member can have multiple loans)
- One-to-many relationship with `Reservation` (one member can have multiple reservations)

**Constraints:**
- Unique email address to prevent duplicate accounts
- Unique member code for identification

### Employee Model

The Employee model represents library staff members with different levels of access.

```prisma
model Employee {
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
  role               String        // employee or admin
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (MongoDB ObjectId) |
| `code` | String | Unique employee code for identification |
| `firstName` | String | Employee's first name |
| `lastName` | String | Employee's last name |
| `street` | String | Street address |
| `city` | String | City of residence |
| `province` | String | State/province of residence |
| `phone` | String | Contact phone number |
| `email` | String | Unique email address (used for login) |
| `password` | String | Hashed password for authentication |
| `role` | String | Access level (employee or admin) |
| `createdAt` | DateTime | Account creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Role Values:**
- `employee`: Regular staff with document and member management abilities
- `admin`: Administrators with additional employee management capabilities

**Constraints:**
- Unique email address to prevent duplicate accounts
- Unique employee code for identification

### Document Model

The Document model represents items in the library collection, including books, comics, video games, and films.

```prisma
model Document {
  id                 String        @id @default(auto()) @map("_id") @db.ObjectId
  title              String
  author             String
  year               Int
  category           String        // Novel, Comics, VideoGame, Film
  ageRating          String        // Kids, Teens, Adults
  genre              String
  description        String
  isbn               String?
  libraryCode        String        @unique
  coverImage         String?
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt
  loans              Loan[]
  reservations       Reservation[]
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (MongoDB ObjectId) |
| `title` | String | Document title |
| `author` | String | Author or creator |
| `year` | Int | Publication or release year |
| `category` | String | Type of document (Novel, Comics, VideoGame, Film) |
| `ageRating` | String | Age appropriateness (Kids, Teens, Adults) |
| `genre` | String | Genre classification |
| `description` | String | Detailed description |
| `isbn` | String? | ISBN for books (optional) |
| `libraryCode` | String | Unique code for library cataloging |
| `coverImage` | String? | URL to cover image (optional) |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relationships:**
- One-to-many relationship with `Loan` (one document can have multiple loans over time)
- One-to-many relationship with `Reservation` (one document can have multiple reservations)

**Category Values:**
- `Novel`: Books and novels
- `Comics`: Comic books and graphic novels
- `VideoGame`: Video games across platforms
- `Film`: Movies and documentaries

**Age Rating Values:**
- `Kids`: Suitable for children
- `Teens`: Suitable for teenagers
- `Adults`: Suitable for adults

**Constraints:**
- Unique library code for identification

### Loan Model

The Loan model represents the borrowing of a document by a member.

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

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (MongoDB ObjectId) |
| `memberId` | String | Reference to the borrowing member |
| `documentId` | String | Reference to the borrowed document |
| `loanDate` | DateTime | Date when the loan was created |
| `expectedReturnDate` | DateTime | Due date for return |
| `actualReturnDate` | DateTime? | Actual return date (null if not yet returned) |
| `status` | String | Current status of the loan |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relationships:**
- Many-to-one relationship with `Member` (many loans can belong to one member)
- Many-to-one relationship with `Document` (many loans can be associated with one document over time)

**Status Values:**
- `Active`: Document is currently on loan
- `Returned`: Document has been returned

**Constraints:**
- Compound uniqueness constraint to prevent duplicate loans
- Index on document ID and status for efficient queries

### Reservation Model

The Reservation model represents requests for documents that are currently unavailable.

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

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (MongoDB ObjectId) |
| `memberId` | String | Reference to the reserving member |
| `documentId` | String | Reference to the reserved document |
| `reservationDate` | DateTime | Date when the reservation was created |
| `expiryDate` | DateTime | Date when the hold expires |
| `status` | String | Current status of the reservation |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Relationships:**
- Many-to-one relationship with `Member` (many reservations can belong to one member)
- Many-to-one relationship with `Document` (many reservations can be associated with one document)

**Status Values:**
- `Pending`: Waiting for document to become available
- `Fulfilled`: Reservation has been converted to a loan
- `Cancelled`: Reservation was cancelled by member or staff

**Constraints:**
- Compound uniqueness constraint to prevent duplicate reservations

### NextAuth Models

The following models support NextAuth.js authentication:

#### Account Model

```prisma
model Account {
  id                 String  @id @default(auto()) @map("_id") @db.ObjectId
  userId             String  @db.ObjectId
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String? @db.String
  access_token       String? @db.String
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.String
  session_state      String?

  @@unique([provider, providerAccountId])
}
```

#### Session Model

```prisma
model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
}
```

#### VerificationToken Model

```prisma
model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Database Indexes

The following indexes are defined to optimize database performance:

| Model | Index | Purpose |
|-------|-------|---------|
| Member | `email` | Fast lookup during authentication |
| Member | `code` | Quick member identification |
| Employee | `email` | Fast lookup during authentication |
| Employee | `code` | Quick employee identification |
| Document | `libraryCode` | Fast lookup by library code |
| Document | `category` | Filtering by document type |
| Loan | `[documentId, status]` | Check document availability |
| Loan | `[memberId, status]` | Member's active loans |
| Reservation | `[documentId, status]` | Check pending reservations |

### Data Validation Rules

The Library Sphere system enforces the following validation rules at the database level:

1. **Email addresses** must be unique across the Member and Employee collections
2. **Member and employee codes** must be unique within their respective collections
3. **Document library codes** must be unique
4. **Loans** cannot be duplicated for the same member, document, and loan date
5. **Reservations** cannot be duplicated for the same member, document, and reservation date

Additional validation is implemented at the application level for business rules that cannot be expressed in the schema.

### Database Relationships Diagram

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

This diagram illustrates the key relationships between the core entities in the Library Sphere database.

## Development

This section provides information for developers working on or contributing to the Library Sphere project. It covers the project structure, coding conventions, testing approaches, and contribution guidelines.

### Project Structure

Library Sphere follows a structured organization to maintain clean separation of concerns and facilitate code maintainability.

#### Directory Organization

```
library-sphere/
├── .next/                  # Next.js build output (generated)
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Prisma schema definition
│   └── seed.js             # Database seeding script
├── public/                 # Static files served by Next.js
│   ├── images/             # Images and icons
│   └── favicon.ico         # Website favicon
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages
│   │   ├── api/            # API route handlers
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── documents/  # Document endpoints
│   │   │   ├── employees/  # Employee endpoints
│   │   │   ├── loans/      # Loan endpoints
│   │   │   ├── members/    # Member endpoints
│   │   │   └── reservations/ # Reservation endpoints
│   │   ├── catalog/        # Catalog browsing page
│   │   ├── documents/      # Document management pages
│   │   ├── employees/      # Employee management pages
│   │   ├── loans/          # Loan management pages
│   │   ├── login/          # Authentication pages
│   │   ├── members/        # Member management pages
│   │   ├── reservations/   # Reservation management pages
│   │   ├── layout.jsx      # Root layout with providers
│   │   └── page.jsx        # Home page
│   ├── components/         # React components
│   │   ├── layout/         # Layout components
│   │   │   ├── Header.jsx  # Site header
│   │   │   ├── Footer.jsx  # Site footer
│   │   │   ├── Sidebar.jsx # Navigation sidebar
│   │   │   └── ...
│   │   ├── providers/      # React context providers
│   │   │   └── SessionProvider.jsx # Auth session provider
│   │   └── ui/             # UI components
│   │       ├── Button.jsx  # Button component
│   │       ├── Card.jsx    # Card component
│   │       ├── Dialog.jsx  # Dialog component
│   │       └── ...
│   ├── lib/                # Utility functions and shared code
│   │   ├── auth.js         # Authentication utilities
│   │   ├── prisma.js       # Prisma client instance
│   │   ├── utils.js        # General utilities
│   │   └── ...
└── package.json            # Project dependencies and scripts
```

#### Key File Locations

| Type | Location |
|------|----------|
| **Page Components** | `src/app/*/page.jsx` |
| **API Handlers** | `src/app/api/*/route.js` |
| **React Components** | `src/components/` |
| **Database Schema** | `prisma/schema.prisma` |
| **Client-Side Utilities** | `src/lib/` |
| **Authentication Config** | `src/app/api/auth/[...nextauth]/route.js` |

#### Code Organization Principles

- **Feature Modularity**: Code is organized primarily by feature (catalog, loans, etc.)
- **Component Reusability**: UI components are designed to be reusable across features
- **API Consistency**: API endpoints follow a consistent structure and naming convention
- **Separation of Concerns**: UI components, data fetching, and business logic are kept separate
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with client-side features

### Coding Conventions

Library Sphere follows consistent coding conventions to maintain code quality and readability.

#### JavaScript Style Guidelines

- **Formatting**: Uses Prettier with default settings
- **Variables**: camelCase for variables and functions
- **Components**: PascalCase for React components
- **Constants**: UPPER_CASE for static values
- **Promises**: Prefer async/await over promise chains
- **Imports**: Group imports by source (React, Next.js, components, utils)
- **Export Style**: Prefer named exports for utilities, default exports for components

#### React Patterns

- **Functional Components**: Use React functional components with hooks
- **Props**: Destructure props in function parameters
- **State Management**: Use React hooks for state (useState, useReducer)
- **Side Effects**: Handle side effects with useEffect
- **Context**: Use React Context for shared state across components
- **Event Handlers**: Prefix event handlers with "handle" (e.g., handleSubmit)
- **Component Organization**:
  ```jsx
  // Component structure
  import { dependencies } from 'packages';
  import { internal components } from 'components';
  
  // Component definition
  function ComponentName({ prop1, prop2 }) {
    // Hooks
    const [state, setState] = useState(initialState);
    
    // Event handlers
    const handleEvent = () => { /* ... */ };
    
    // Helper functions
    const helperFunction = () => { /* ... */ };
    
    // Render
    return (
      <div>
        {/* Component JSX */}
      </div>
    );
  }
  
  export default ComponentName;
  ```

#### File Naming Conventions

- **React Components**: `PascalCase.jsx`
- **API Routes**: `route.js`
- **Utility Files**: `camelCase.js`
- **Configuration Files**: `camelCase.config.js`
- **Test Files**: `ComponentName.test.jsx`

#### Styling Conventions

- **Approach**: Tailwind CSS utility classes
- **Custom Components**: shadcn/ui components with Tailwind CSS
- **Component Styling**: Use CSS variable system for theme customization
- **Responsive Design**: Mobile-first approach with responsive utility classes
- **Dark Mode**: Support via Tailwind's dark mode classes

#### Documentation Conventions

- **JSDoc**: Use JSDoc comments for functions and components
- **Code Comments**: Comment complex logic and business rules
- **README**: Maintain up-to-date README with setup instructions
- **Change Log**: Document significant changes in version history

### Testing

Library Sphere implements a comprehensive testing strategy to ensure code quality and reliability.

#### Testing Approach

The project follows these testing principles:
- **Component Testing**: Test UI components in isolation
- **Integration Testing**: Test interactions between components
- **API Testing**: Verify API endpoints work as expected
- **End-to-End Testing**: Validate complete user workflows

#### Testing Tools

- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing utilities
- **MSW (Mock Service Worker)**: API mocking
- **Cypress**: End-to-end testing

#### Test Organization

Tests are organized to mirror the source code structure:

```
src/
├── components/
│   └── ui/
│       ├── Button.jsx
│       └── Button.test.jsx
├── app/
│   └── api/
│       └── documents/
│           ├── route.js
│           └── route.test.js
tests/
├── integration/
│   └── login.test.js
└── e2e/
    └── loan-process.spec.js
```

#### Writing Tests

**Component Tests:**

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**API Tests:**

```javascript
// route.test.js
import { createMocks } from 'node-mocks-http';
import handler from './route';
import { prismaMock } from '@/lib/prisma-mock';

describe('/api/documents endpoint', () => {
  it('returns a list of documents', async () => {
    prismaMock.document.findMany.mockResolvedValue([
      { id: '1', title: 'Test Document' }
    ]);
    
    const { req, res } = createMocks({
      method: 'GET',
    });
    
    await handler(req, res);
    
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      data: [{ id: '1', title: 'Test Document' }]
    });
  });
});
```

#### Running Tests

Test execution is configured in package.json:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run"
  }
}
```

#### Continuous Integration

Tests are automatically run on:
- Pull request creation
- Push to main branch
- Scheduled daily runs

### Contributing

This section outlines the process for contributing to the Library Sphere project.

#### Getting Started

1. **Fork the Repository**
   - Create a fork of the main repository on GitHub

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/library-sphere.git
   cd library-sphere
   ```

3. **Set Up Development Environment**
   ```bash
   npm install
   cp .env.example .env.local
   # Configure .env.local with your MongoDB connection string
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

#### Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
   Branch naming conventions:
   - `feature/` - New features
   - `fix/` - Bug fixes
   - `refactor/` - Code refactoring
   - `docs/` - Documentation changes
   - `test/` - Adding or updating tests

2. **Make Your Changes**
   - Follow the coding conventions
   - Update or add tests for your changes
   - Update documentation if necessary

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Commit message format:
   - `feat:` - A new feature
   - `fix:` - A bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code changes that neither fix bugs nor add features
   - `test:` - Adding or updating tests
   - `chore:` - Changes to build process, dependencies, etc.

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with details about your changes

#### Pull Request Process

1. **Initial Review**
   - Automated tests must pass
   - At least one maintainer must review the code
   - Address any feedback from reviewers

2. **Final Approval**
   - Once approved, a maintainer will merge your PR
   - Squash merging is preferred for clean commit history

3. **After Merge**
   - Delete your branch
   - Update your local repository with the latest changes from main

#### Code Review Guidelines

- **Focus on the Code**: Review the code, not the author
- **Be Constructive**: Suggest improvements rather than just pointing out issues
- **Consider Context**: Take into account the overall project goals and constraints
- **Look for Edge Cases**: Consider potential failure modes and security implications
- **Check Tests**: Ensure new code is adequately tested

#### Documentation

When contributing, update documentation to reflect your changes:

- **Code Comments**: Add inline documentation for complex logic
- **README**: Update setup instructions if dependencies change
- **DOCUMENTATION.md**: Update feature documentation for new or changed features
- **JSDoc**: Add or update JSDoc comments for functions and components

#### Support and Questions

If you need help or have questions:

- **Open an Issue**: Create a GitHub issue with the 'question' label
- **Discussion Forum**: Use the GitHub Discussions feature for longer conversations
- **Ask for Help**: Tag maintainers in your issue if you need specific expertise

## Troubleshooting

This section provides guidance on resolving common issues that may arise when using or developing with Library Sphere.

### Common Issues

#### Authentication Problems

1. **Unable to Log In**
   
   **Symptoms**:
   - Login form submission fails
   - "Invalid credentials" error
   - Endless loading after login attempt
   
   **Possible Causes and Solutions**:
   
   - **Incorrect Credentials**
     - Verify email and password are correct
     - Check for caps lock or typing errors
     - Reset password if necessary
   
   - **Database Connection Issues**
     - Verify DATABASE_URL is correct in environment variables
     - Check if MongoDB Atlas service is available
     - Ensure network allows connections to the database
   
   - **NextAuth Configuration**
     - Verify NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly
     - Check for errors in NextAuth logs
     - Ensure the authentication provider is properly configured

2. **Session Expires Too Quickly**
   
   **Symptoms**:
   - Frequent logout while using the application
   - "Unauthorized" errors after brief inactivity
   
   **Solutions**:
   
   - Check NextAuth.js configuration for session duration
   - Verify that cookies are not being blocked by browser settings
   - Ensure the `maxAge` setting is appropriate for your use case

3. **Role-Based Access Issues**
   
   **Symptoms**:
   - Access denied to features that should be available
   - Redirect loops when accessing certain pages
   
   **Solutions**:
   
   - Verify user role is correctly set in the database
   - Check role assignment during authentication
   - Inspect session token to confirm role information is present
   - Clear browser cookies and log in again

#### API and Data Issues

1. **API Endpoints Return Errors**
   
   **Symptoms**:
   - 400, 401, 403, or 500 errors from API calls
   - Failed data loading in the UI
   
   **Solutions**:
   
   - Check browser console for detailed error messages
   - Verify authentication token is valid
   - Ensure request payload matches expected format
   - Check server logs for backend errors
   - Verify database connection is active

2. **Missing or Incomplete Data**
   
   **Symptoms**:
   - Empty listings where data should appear
   - Partial information displayed in the UI
   
   **Solutions**:
   
   - Verify database contains the expected records
   - Check API response format matches UI expectations
   - Ensure relations are properly included in database queries
   - Look for filter parameters that might be excluding data

3. **Duplicate Entries**
   
   **Symptoms**:
   - Multiple identical loans or reservations
   - Duplicate document entries
   
   **Solutions**:
   
   - Verify unique constraints in database schema
   - Check for race conditions in API endpoints
   - Ensure transaction isolation in multi-step operations
   - Add deduplication logic if needed

#### Installation and Setup Issues

1. **Unable to Start Development Server**
   
   **Symptoms**:
   - Error when running `npm run dev`
   - Server starts but crashes immediately
   
   **Solutions**:
   
   - Verify Node.js version meets requirements (v18.17.0+)
   - Ensure all dependencies are installed (`npm install`)
   - Check for port conflicts (default port is 3000)
   - Verify environment variables are correctly set
   - Look for syntax errors in recently modified files

2. **Database Connection Failures**
   
   **Symptoms**:
   - Prisma errors when starting the application
   - "Could not connect to database" messages
   
   **Solutions**:
   
   - Verify MongoDB Atlas credentials are correct
   - Check network connection and firewall settings
   - Ensure IP address is whitelisted in MongoDB Atlas
   - Verify database exists and has correct name
   - Run `npx prisma generate` to update Prisma client

3. **Build Errors in Production**
   
   **Symptoms**:
   - Build fails on Vercel or other hosting platforms
   - TypeScript errors during build process
   
   **Solutions**:
   
   - Check build logs for specific error messages
   - Verify all dependencies are included in package.json
   - Ensure NODE_ENV is set to "production"
   - Add necessary build commands for Prisma
   - Fix any type errors or lint issues

#### UI and Rendering Issues

1. **Layout Problems**
   
   **Symptoms**:
   - Elements overlapping or misaligned
   - Content overflowing containers
   - Inconsistent appearance across devices
   
   **Solutions**:
   
   - Test on different screen sizes and browsers
   - Use browser dev tools to inspect layout issues
   - Verify Tailwind CSS classes are applied correctly
   - Check for missing responsive design classes
   - Ensure CSS variables are properly defined

2. **Slow UI Performance**
   
   **Symptoms**:
   - Sluggish interaction response
   - Delayed rendering after data changes
   - Long loading times for pages
   
   **Solutions**:
   
   - Optimize rendering with React.memo or useMemo
   - Implement pagination for large data sets
   - Add loading states for asynchronous operations
   - Reduce unnecessary re-renders
   - Check for excessive API calls

3. **Form Submission Issues**
   
   **Symptoms**:
   - Forms submit but data isn't saved
   - Validation errors that aren't clear
   - Multiple identical submissions
   
   **Solutions**:
   
   - Check form data is correctly formatted
   - Verify API endpoint is processing data correctly
   - Implement submit button disabling to prevent duplicates
   - Ensure validation messages are displayed to users
   - Add clear success/error feedback after submission

### Debugging Tips

#### Server-Side Debugging

1. **Logging**
   
   Add detailed logging to troubleshoot server-side issues:
   
   ```javascript
   // Enhanced logging in API route
   export async function GET(req) {
     console.log('Request received:', req.url);
     try {
       const data = await prisma.document.findMany();
       console.log('Data retrieved:', data.length, 'records');
       return Response.json({ data });
     } catch (error) {
       console.error('Error in document API:', error);
       return Response.json({ error: error.message }, { status: 500 });
     }
   }
   ```
   
   Key areas to add logging:
   - API route entry points
   - Database operations
   - Authentication flows
   - Error handling blocks

2. **Environment Inspection**
   
   Create a diagnostic endpoint to verify environment configuration:
   
   ```javascript
   // Development-only diagnostic endpoint
   export async function GET(req) {
     if (process.env.NODE_ENV !== 'development') {
       return Response.json({ error: 'Not available in production' }, { status: 403 });
     }
     
     return Response.json({
       nodeEnv: process.env.NODE_ENV,
       databaseConnected: await checkDatabaseConnection(),
       nextAuthConfigured: Boolean(process.env.NEXTAUTH_SECRET),
       apiVersion: '1.0.0'
     });
   }
   ```

3. **Database Inspection**
   
   Use Prisma Studio to inspect and manipulate database records:
   
   ```bash
   npx prisma studio
   ```
   
   This provides a web interface to view and edit all database collections.

#### Client-Side Debugging

1. **React Developer Tools**
   
   Install the React Developer Tools browser extension to inspect:
   - Component hierarchy
   - Props and state
   - Render performance
   - Context values

2. **Network Monitoring**
   
   Use browser developer tools to:
   - Monitor API requests and responses
   - Check for failed network requests
   - Verify request payloads
   - Measure response times

3. **Client-Side Logging**
   
   Implement a custom logging utility:
   
   ```javascript
   // lib/logger.js
   const logger = {
     debug: (message, ...args) => {
       if (process.env.NODE_ENV !== 'production') {
         console.debug(`[DEBUG] ${message}`, ...args);
       }
     },
     info: (message, ...args) => {
       console.info(`[INFO] ${message}`, ...args);
     },
     error: (message, ...args) => {
       console.error(`[ERROR] ${message}`, ...args);
     }
   };
   
   export default logger;
   ```
   
   Use it throughout your components:
   
   ```javascript
   import logger from '@/lib/logger';
   
   function Component() {
     logger.debug('Component rendering', { props });
     // Component code...
   }
   ```

#### Troubleshooting NextAuth.js

1. **Session Debugging**
   
   Create a component to display current session details:
   
   ```jsx
   // components/SessionDebug.jsx (development only)
   import { useSession } from "next-auth/react";
   
   export default function SessionDebug() {
     const { data: session, status } = useSession();
     
     if (process.env.NODE_ENV === 'production') return null;
     
     return (
       <div className="bg-yellow-100 p-4 rounded-md text-xs">
         <h3 className="font-bold">Session Debug</h3>
         <p>Status: {status}</p>
         <pre>{JSON.stringify(session, null, 2)}</pre>
       </div>
     );
   }
   ```

2. **Authentication Flow Testing**
   
   Create a test script to verify authentication flows:
   
   ```javascript
   // scripts/test-auth.js
   async function testAuth() {
     try {
       // Test member login
       const memberResponse = await fetch('http://localhost:3000/api/auth/callback/credentials', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
           email: 'test@example.com', 
           password: 'password123',
           role: 'member' 
         })
       });
       
       console.log('Member auth test:', memberResponse.status === 200 ? 'PASS' : 'FAIL');
       console.log(await memberResponse.json());
       
       // Add more tests as needed
     } catch (error) {
       console.error('Auth test failed:', error);
     }
   }
   
   testAuth();
   ```

#### Performance Troubleshooting

1. **React Profiler**
   
   Use React Profiler to identify performance bottlenecks:
   
   ```jsx
   // In development only
   import { Profiler } from 'react';
   
   function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
     console.log(`Component ${id} took ${actualDuration}ms to render`);
   }
   
   // Wrap slow components
   <Profiler id="CatalogPage" onRender={onRenderCallback}>
     <CatalogPage />
   </Profiler>
   ```

2. **Performance Monitoring**
   
   Implement basic performance metrics:
   
   ```javascript
   // Add to layout.js or individual pages
   useEffect(() => {
     if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
       const t0 = performance.now();
       
       return () => {
         const t1 = performance.now();
         console.log(`Page took ${t1 - t0}ms to render completely`);
       };
     }
   }, []);
   ```

3. **Memory Leak Detection**
   
   Check for memory leaks in components:
   
   ```javascript
   // Track component mount/unmount
   useEffect(() => {
     console.log('Component mounted');
     
     return () => {
       console.log('Component unmounted');
     };
   }, []);
   ```

### Resolution Workflow

When encountering issues, follow this systematic resolution workflow:

1. **Identify the Problem**
   - Determine exactly what's not working
   - Document steps to reproduce the issue
   - Note any error messages or unusual behavior

2. **Isolate the Cause**
   - Determine if it's a frontend or backend issue
   - Check if it's environment-specific
   - Identify which component or feature is affected

3. **Apply Targeted Solutions**
   - Address the specific issue identified
   - Start with the simplest potential fix
   - Test thoroughly after each change

4. **Document the Solution**
   - Record what fixed the issue
   - Update documentation if needed
   - Share the solution with the team

5. **Implement Preventive Measures**
   - Add validation to prevent similar issues
   - Improve error handling
   - Add automated tests for the scenario

## Changelog

This section documents the version history of Library Sphere and outlines planned future enhancements.

### Version History

#### v1.0.0 (Initial Release) - July 2023

**Core Features:**
- Basic authentication system for members and staff
- Document catalog with browsing and search
- Loan management system
- Member management
- Staff administration

**Technical Implementation:**
- Next.js 13 with App Router
- MongoDB database integration with Prisma
- NextAuth.js authentication
- shadcn/ui component library
- Tailwind CSS styling

#### v1.1.0 - September 2023

**New Features:**
- Reservation system for unavailable documents
- Enhanced document details page
- Improved search functionality with filters
- Member profile customization
- Basic reporting for administrators

**Improvements:**
- Performance optimizations for catalog browsing
- Enhanced mobile responsiveness
- Better error handling and user feedback
- UI refinements across all pages
- Extended database indexing for faster queries

**Bug Fixes:**
- Fixed authentication persistence issues
- Resolved race conditions in loan processing
- Corrected date handling in loan durations
- Fixed styling inconsistencies in various components
- Addressed accessibility issues in form controls

#### v1.2.0 - November 2023

**New Features:**
- Document ratings and reviews
- Staff notification system
- Administrative dashboard with key metrics
- Batch operations for document management
- Print functionality for loan receipts

**Improvements:**
- Redesigned catalog interface
- Enhanced form validation with clear error messages
- Optimized database queries for faster response times
- Added document availability indicators
- Improved session management

**Bug Fixes:**
- Resolved issues with reservation expiry processing
- Fixed document filtering in certain edge cases
- Corrected permission checks in staff operations
- Addressed data inconsistencies in member profiles
- Fixed layout issues on ultra-wide screens

#### v1.3.0 - February 2024

**New Features:**
- Multi-language support (English, French, Spanish)
- Document recommendation system
- Enhanced reporting with charts and graphs
- Customizable email notifications
- Staff activity logging

**Improvements:**
- Refined user interface with new design elements
- Faster application loading and navigation
- Enhanced search algorithm with better relevance
- Improved error recovery mechanisms
- Optimized image loading for document covers

**Bug Fixes:**
- Resolved session timeout handling issues
- Fixed search results pagination
- Corrected loan date calculations
- Addressed mobile navigation menu bugs
- Fixed document sorting inconsistencies

#### v1.4.0 (Current Version) - May 2024

**New Features:**
- Fine management system for overdue returns
- Member communication tools for staff
- Barcode scanner integration for check-out/check-in
- Document import/export functionality
- Advanced member analytics

**Improvements:**
- Major performance optimizations across all features
- Redesigned loan and reservation workflows
- Enhanced accessibility compliance
- Improved error handling with guided resolution
- Updated component library for better UI consistency

**Bug Fixes:**
- Fixed concurrent loan processing issues
- Resolved MongoDB connection pooling problems
- Corrected reservation conflict resolution
- Fixed user role assignment inconsistencies
- Addressed dark mode styling issues

**Security Enhancements:**
- Implemented stronger password policies
- Enhanced session security measures
- Added rate limiting for authentication attempts
- Improved data validation across all inputs
- Updated dependencies to resolve security vulnerabilities

### Upcoming Features

The following features are planned for future releases of Library Sphere:

#### Short-Term Roadmap (Next 3-6 Months)

1. **Digital Content Management**
   - Support for e-books and digital media
   - Online document viewer integration
   - Digital lending workflows
   - Content access control

2. **Advanced Search Capabilities**
   - Full-text search across all document fields
   - Natural language query processing
   - Search suggestions and corrections
   - Search history and saved searches

3. **Enhanced User Experience**
   - Personalized user dashboards
   - Custom themes and appearance settings
   - Improved mobile experience
   - Keyboard shortcuts for power users

4. **Reporting and Analytics**
   - Customizable report builder
   - Data export in multiple formats
   - Advanced filtering and visualization
   - Scheduled report generation

5. **System Integrations**
   - Calendar integration for due dates
   - Payment gateway for fines
   - Single sign-on (SSO) options
   - Social media sharing integration

#### Long-Term Vision (6-12 Months)

1. **Community Features**
   - Member discussion forums
   - Book clubs and reading groups
   - Document reviews and recommendations
   - Reading challenges and achievements

2. **AI-Powered Enhancements**
   - Intelligent document recommendations
   - Automated categorization of new documents
   - Natural language search processing
   - Predictive analysis for collection development

3. **Mobile Application**
   - Native mobile apps for iOS and Android
   - Offline access to essential features
   - Mobile notification system
   - Barcode scanning for self-checkout

4. **Advanced Administration**
   - Customizable workflow automation
   - Document acquisition management
   - Budget and cost tracking
   - Staff scheduling and task management

5. **Extended Content Support**
   - Audio book integration
   - Streaming media services
   - Academic resource management
   - Periodical and subscription tracking

### Feature Request Process

Library Sphere is continuously evolving based on user feedback. To suggest new features or enhancements:

1. **How to Submit Feature Requests**
   - Reach out directly to the development team via email
   - Provide a clear, detailed description of the desired functionality
   - Explain the use case and potential benefits for library users or staff
   - If possible, include examples of similar features in other systems

2. **What Happens After Submission**
   - The development team will review all feature requests
   - You may be contacted for additional information or clarification
   - Approved features will be added to the development roadmap
   - You will be notified when a feature you requested is implemented

3. **Feature Prioritization Approach**
   - Features are assessed based on overall value to users
   - Implementation complexity and resource requirements are considered
   - Integration with existing functionality is evaluated
   - Security and stability improvements are given high priority