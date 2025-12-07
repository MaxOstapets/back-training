import { Router } from "express";
import { Product } from "../models/product.model.js";
import { isAuth } from "../middleware/isAutj.js";

const productRouter = Router()

productRouter.get("/all", isAuth, async(req, res) => {
    const params = req.query
    const products = await Product.find()
    .limit()
    .skip()
    res.send("PRODUCT SUCCES")
})

export {productRouter}