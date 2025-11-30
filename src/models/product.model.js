import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    count: Number
})

export const Product = mongoose.model("Product", productSchema)