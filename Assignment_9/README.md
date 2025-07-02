# Secrets - Authentication Web Application

A secure web application with user authentication, featuring login, signup, and dashboard pages. Built with Node.js, Express, MongoDB, and EJS.

## Features

- 🔐 **Secure Authentication**: Password encryption using bcryptjs
- 👤 **User Registration**: Sign up with name, email, and password
- 🔑 **User Login**: Secure login with email and password
- 🛡️ **Protected Routes**: Dashboard only accessible to authenticated users
- 💾 **Database Storage**: User data stored in MongoDB with Mongoose
- 🎨 **Modern UI**: Clean and responsive design
- 🔄 **Session Management**: Express sessions for user state
- ✅ **Password Validation**: Real-time password strength validation with requirements checklist

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assignment_9
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/secrets_app
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production
   PORT=3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Run the application**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open your browser and go to `http://localhost:8000`

## Project Structure

```
Assignment_9/
├── config/
│   └── db.js              # MongoDB connection configuration
├── models/
│   └── User.js            # User model with Mongoose schema
├── views/
│   ├── login.ejs          # Login page
│   ├── signup.ejs         # Signup page
│   ├── dashboard.ejs      # Protected dashboard page
│   └── index.ejs          # Main index page
├── index.js               # Main Express server
├── package.json           # Project dependencies
└── README.md              # This file
```

## API Endpoints

- `GET /` - Redirects to login page
- `GET /login` - Login page
- `POST /login` - Handle login form submission
- `GET /signup` - Signup page
- `POST /signup` - Handle signup form submission
- `GET /dashboard` - Protected dashboard page
- `GET /logout` - Logout user and destroy session

## Security Features

- **Password Encryption**: Passwords are hashed using bcryptjs with 12 salt rounds
- **Session Management**: Secure session handling with express-session
- **Input Validation**: Form validation and sanitization
- **Protected Routes**: Middleware to protect dashboard access
- **Error Handling**: Comprehensive error handling throughout the application

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcryptjs for password hashing
- **Sessions**: express-session for session management
- **Frontend**: EJS templating engine with CSS
- **Development**: nodemon for auto-restart

## Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Sign in with your email and password
3. **Dashboard**: View your protected dashboard with user information
4. **Logout**: Click the logout button to end your session

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Arbaaz Khan 