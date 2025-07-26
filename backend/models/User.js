const mongoose = require("mongoose");

// 1. Create schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, // no two users can have same email
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["member", "teamLead"],
            default: "member",
        },
    },
    { timestamps: true } // adds createdAt and updatedAt fields automatically
);

// 2. Create model
const User = mongoose.model("User", userSchema);

// 3. Export model
module.exports = User;
