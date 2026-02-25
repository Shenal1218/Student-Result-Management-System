Student Result Management System

 Group Information


| Student | Full Name (as in LMS) | Student ID | Role |
|---------|------------------------|------------|------|
| Student 1 | K. L. A. R. Shenal Perera|  ITBIN-2313-0080  | DevOps Engineer |
| Student 2 | M.S Sithumini  |ITBIN-2313-0111 | Backend Developer |
| Student 3 |H.M.H.K.Herath  |ITBIN-2313-0037 | Frontend Developer |

Project Description

The Student Result Management System is a web-based application designed to manage, store, and display student academic results efficiently.

The system allows administrators to add, update, and manage student marks, while students can securely view their results. This project demonstrates practical implementation of full-stack development combined with Git version control and DevOps CI/CD practices.

 Live Deployment
🔗 **Live URL:** *(Add your deployed application link here — e.g., Render / Vercel / Railway)*

Technologies Used

 - HTML5
 - CSS3
 - JavaScript
 - Node.js
 - Express.js
 - Git & GitHub
 - GitHub Actions (CI/CD)
 - Render / Vercel (Deployment Platform)

 Features

 - Add Student Records
 - Update Student Marks
 - View Student Results
 - Admin Management Panel
 - Responsive User Interface
 - CI/CD Pipeline with GitHub Actions

 Branch Strategy
We implemented the following branching strategy:

- main - Production branch
- develop- Integration branch
- feature/ - Feature development branches

This strategy ensures clean production releases and organized team collaboration.

Individual Contributions

K. L. A. R. Shenal Perera

 - Repository setup and configuration
 - Branch structure implementation
 - GitHub Actions CI/CD pipeline setup
 - Deployment configuration
 - Server configuration and integration

 M.S Sithumini

- Backend API development
- Database integration
- Student result CRUD operations
- Validation and error handling

H.M.H.K.Herath

- Frontend UI design
- Form validation
- Responsive layout implementation
- Result display interface

Setup Instructions

 Prerequisites

 - Node.js (version 18 or higher)
-  Git

Installation

bash
- Clone the repository
git clone https://github.com/Shenal1218/Student-Result-Management-System.git

- Navigate to project directory
Student-Result-Management-System

- Install dependencies
npm install

- Run development server
npm start

 Deployment Process
1. Code is pushed to the `develop` branch.
2. After testing, changes are merged into the `main` branch.
3. GitHub Actions automatically runs:

   - Install dependencies
   - Run build/test checks
4. If successful, the application is automatically deployed to the hosting platform.
5. Production updates are live via the `main` branch.

This ensures automated integration and continuous deployment (CI/CD).

 Challenges Faced

- Managing merge conflicts during team collaboration
- Setting up proper branch protection rules
- Configuring CI/CD pipeline correctly
- Debugging deployment environment issues

These challenges were resolved through proper communication, testing, and structured Git workflow usage.

Build Status

 Build: Passing
 Deployment: Successful
 CI/CD: Active

 Step-by-Step Implementation Guide

- Phase 1: Setup 

 - Step 1: Team Formation & Planning

1. Form a team of 2–3 students
2. Assign roles based on strengths
3. Define system features
4. Plan branch strategy


 - Step 2: Repository Creation (DevOps Engineer)

1. Create GitHub repository
2. Name: `student-result-management-system-devops`
3. Set visibility to Public
4. Do NOT initialize with README

 - Step 3: Add Collaborators

1. Go to Settings → Collaborators
2. Add team members
3. Accept invitation

Step 4: Clone Repository (All Members)

bash
git clone https://github.com/Shenal1218/Student-Result-Management-System.git
Student-Result-Management-System

 -  Step 5: Initial Setup (DevOps Engineer)
bash
- Create develop branch
git checkout -b develop
git push -u origin develop

-  Create GitHub Actions directory
mkdir -p .github/workflows

- Initial commit
git add .
git commit -m "chore: initial repository setup"
git push origin develop




