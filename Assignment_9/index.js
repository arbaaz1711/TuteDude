const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Secret = require("./models/Secret");
const MongoStore = require("connect-mongo");
const http = require("http");
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
      mongoUrl: process.env.MONGODB_URI,
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

// Health check route for Render
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

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

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render("login", { error: "Invalid email or password" });
    }

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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "User with this email already exists",
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);

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
    const secrets = await Secret.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.render("dashboard", { user, secrets });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.redirect("/login");
  }
});

app.post("/secrets", requireAuth, async (req, res) => {
  try {
    const { secret } = req.body;
    if (!secret || !secret.trim()) {
      return res.redirect("/dashboard");
    }

    await Secret.create({
      user: req.session.userId,
      content: secret.trim()
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Save secret error:", error);
    res.redirect("/dashboard");
  }
});

app.post("/secrets/:id/delete", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.redirect("/dashboard");
    }

    await Secret.deleteOne({ _id: id, user: req.session.userId });
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Delete secret error:", error);
    res.redirect("/dashboard");
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

// Create server with custom timeouts
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// Set timeouts (in ms)
server.keepAliveTimeout = 120000; // 2 minutes
server.headersTimeout = 130000; // Must be > keepAliveTimeout

server.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
