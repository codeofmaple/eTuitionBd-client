# 🎓 eTuitionBd -- Tuition Management Platform

## 🔗 Live Website

https://etuitionbd-360.web.app/

## 📦 Repositories

-   Client: https://github.com/codeofmaple/eTuitionBd-client
-   Server: https://github.com/codeofmaple/eTuitionBd-server

------------------------------------------------------------------------

## 📖 Introduction

eTuitionBd is a full-stack Tuition Management System where students,
tutors, and admins can manage tuition posts, tutor applications,
approvals, payments, and analytics in one secure platform.

------------------------------------------------------------------------

## 🎯 Project Purpose

-   Connect students with verified tutors
-   Reduce friction using automated workflows
-   Ensure secure payments and transparency
-   Provide admin-level monitoring and analytics

------------------------------------------------------------------------

## ✨ Features

### 🌐 Public

-   Responsive UI
-   Tuition & Tutor listings
-   Search, filter & pagination
-   Secure authentication

### 🔐 Authentication

-   Firebase authentication
-   Email & Google login
-   JWT-based protected routes

------------------------------------------------------------------------

## 👥 User Roles

### 👨‍🎓 Student

-   Post, update & delete tuition
-   View tutor applications
-   Approve tutor via Stripe payment
-   Payment history & profile management

### 🧑‍🏫 Tutor

-   Apply to tuition posts
-   Track application status
-   Ongoing tuitions
-   Revenue history

### 🛡️ Admin

-   User management
-   Tuition approval/rejection
-   Reports & analytics
-   Platform monitoring

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React
-   React Router
-   Tailwind CSS
-   DaisyUI
-   Framer Motion
-   Axios

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   JWT

### Tools

-   Firebase Authentication
-   Stripe Payment Gateway

------------------------------------------------------------------------

## ⚙️ Installation

``` bash
git clone https://github.com/codeofmaple/eTuitionBd-client
git clone https://github.com/codeofmaple/eTuitionBd-server
npm install
npm run dev
```

------------------------------------------------------------------------

## 🔑 Environment Variables

### Client (.env)

``` env
VITE_apiKey=your_firebase_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

### Server (.env)

``` env
DB_USER=your_db_user
DB_PASS=your_db_password
ACCESS_TOKEN_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

------------------------------------------------------------------------

## 🧩 Challenges Implemented

-   Search & Sort
-   Pagination
-   JWT Role Verification
-   Advanced Filtering

------------------------------------------------------------------------

## 🚀 Future Improvements

-   Tutor reviews
-   In-app messaging
-   Notifications
-   Class scheduling

------------------------------------------------------------------------

## 📄 License

Educational Project -- eTuitionBd © 2025
