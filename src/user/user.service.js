import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"

export const userCreateService = async(firstName, lastName, email, password) => {
        try{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            
            const newUser = {
                firstName,
                lastName,
                password: hashedPassword,
                email,
                role: "user"
            }
        
            const user = await User.create(newUser)
            return user
            
        }catch(e){
            throw new Error("ERROR: ", e.message)
        }
}