import { Router } from "express";
import path from "path"
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { userCreateService } from "./user.service.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { isAuth } from "../middleware/isAutj.js";

const userRouter = Router()
const __dirname = import.meta.dirname

userRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "test.ejs"))
    // res.render("test", {users})
})

userRouter.post("/register", async (req, res) => {
    const {firstName, lastName, email, password, role} = req.body

    const result = await userCreateService(firstName, lastName, email, password, role)

    res.send("SUCCES REGISTER", result)
})

userRouter.post("/auth", async (req, res) => {
    const {email, password} = req.body

    try{
        const existedUser = await User.findOne({email})
        const isPasswordCorrect = bcrypt.compare(password, existedUser.password)

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
        res.send("AUTH IS SUCCESSFFUL")
    }catch(e){
        throw new Error("ERROR: ", e.message)
    }
})

userRouter.get("/logout", (req, res) => {
    req.session.destroy()
    res.send("LOGOUT")
})

userRouter.get("/allUsers", isAdmin, async (req, res) => {
    const users = await User.find()
    return res.send(users) 
})

export {userRouter}