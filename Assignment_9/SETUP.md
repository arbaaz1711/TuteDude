# Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher - though v18+ recommended)
- MongoDB running locally or MongoDB Atlas account

## Quick Start

1. **Create a `.env` file** in the root directory with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/secrets_app
   SESSION_SECRET=your-secret-key-here
   PORT=3000
   ```

2. **Start MongoDB** (if using local MongoDB):
   ```bash
   # On Windows, start MongoDB service
   # Or use MongoDB Atlas for cloud database
   ```

3. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

4. **Start the application**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Open http://localhost:3000 in your browser

## What You'll See

- **Login Page** (`/login`): Email and password fields
- **Signup Page** (`/signup`): Name, email, and password fields  
- **Dashboard** (`/dashboard`): Protected page showing "You are logged in and seeing protected page"

## Features Implemented

✅ **Login Page**: Email and password fields only  
✅ **Signup Page**: Name, email, and password fields  
✅ **Dashboard**: Protected page with user info  
✅ **Password Encryption**: Using bcryptjs  
✅ **Password Validation**: Real-time validation with requirements checklist
  - Minimum 6 characters
  - At least one lowercase letter
  - At least one uppercase letter  
  - At least one number
✅ **Database Storage**: MongoDB with Mongoose  
✅ **Session Management**: Express sessions  
✅ **Protected Routes**: Middleware authentication  

## Testing the Application

1. Go to `/signup` and create a new account
2. You'll be redirected to `/login`
3. Login with your credentials
4. You'll see the protected dashboard
5. Try accessing `/dashboard` directly - it will redirect to login if not authenticated
6. Use the logout button to end your session

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running or update the MONGODB_URI in `.env`
- **Port Already in Use**: Change the PORT in `.env` file
- **Node Version Warnings**: The app works with Node.js v16+ but v18+ is recommended 