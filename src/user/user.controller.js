import { Router } from "express";
import {users} from "../users.data.js"
import path from "path"
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { logger } from "../middleware/logger.js";
import { userCreateService } from "./user.service.js";

const userRouter = Router()
const __dirname = import.meta.dirname

userRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "test.ejs"))
    res.render("test", {users})
})

userRouter.post("/test1", logger, (req, res) => {
    const {id, name, age, isDev} = req.body
    const user = {id, name, age, isDev}
    users.push(user)
    res.send(user)
})

userRouter.get("/test/:id", (req, res) => {
    const slug = req.params.id
    const user = users.find((el) => el.id == slug)
    res.json(user)
})

userRouter.post("/register", async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    const result = await userCreateService(firstName, lastName, email, password)

    res.send("RESULT", result)
})

userRouter.post("/auth", async (req, res) => {
    try{
        const existedUser = await User.findOne({email: req.body.email})
        const isPasswordCorrect = await bcrypt.compare(req.body.password, existedUser.password)

        if(!isPasswordCorrect){
            res.send("AUTH HAS FAILED")
        }
    
        console.log("EXISTED USER: ", existedUser)
        console.log("IS PASSWORD CORRECT: ", isPasswordCorrect)

        req.session.user = {
            id: existedUser.id,
            email: existedUser.email,
            role: existedUser.role
        }
        
        console.log(req.session.user)

        res.send("AUTH IS SUCCESSFFUL")
    }catch(e){
        throw new Error("ERROR: ", e.message)
    }
})

export {userRouter}