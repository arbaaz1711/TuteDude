const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function(password) {
                // Check minimum length
                if (password.length < 6) return false;
                
                // Check for lowercase letter
                if (!/[a-z]/.test(password)) return false;
                
                // Check for uppercase letter
                if (!/[A-Z]/.test(password)) return false;
                
                // Check for number
                if (!/\d/.test(password)) return false;
                
                return true;
            },
            message: "Password must be at least 6 characters long and contain lowercase, uppercase, and number"
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema); 