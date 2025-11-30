import { Router } from "express";
import { Product } from "../models/product.model";

const productRouter = Router()

productRouter.get("/products", async(req, res) => {
    const params = req.query
    const products = await Product.find()
    .limit()
    .skip()
})