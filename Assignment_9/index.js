const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // from your .env or Render
      collectionName: "sessions",
    }),
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Routes
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/dashboard");
  }
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // Set session
    req.session.userId = user._id;
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    res.render("login", { error: "An error occurred during login" });
  }
});

app.get("/signup", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/dashboard");
  }
  res.render("signup", { error: null });
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate password requirements
    const passwordErrors = [];
    if (password.length < 6) {
      passwordErrors.push("Password must be at least 6 characters long");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one lowercase letter"
      );
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one uppercase letter"
      );
    }
    if (!/\d/.test(password)) {
      passwordErrors.push("Password must contain at least one number");
    }

    if (passwordErrors.length > 0) {
      return res.render("signup", {
        error: "Password validation failed: " + passwordErrors.join(", "),
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Redirect to login
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.render("signup", { error: errorMessages.join(", ") });
    }

    res.render("signup", { error: "An error occurred during signup" });
  }
});

app.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render("dashboard", { user });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/login");
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
