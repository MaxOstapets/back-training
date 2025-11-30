import { Router } from "express";

const todoRouter = Router()

todoRouter.get("/", (req, res) => {
    res.send("TODO")
})

export {todoRouter}