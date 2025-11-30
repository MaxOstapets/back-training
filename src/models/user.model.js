import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String
})

export const User = mongoose.model("User", userSchema)