import { User } from "../models/user.model.js"

export async function isAuth(req, res, next){
    try{
        if(!req.session.user.email || !req.session){
            //TODO replace to correct path
            return res.redirect("/home")
        }
        const existedUser = await User.findOne({email})
        console.log("USER:", existedUser)
        if(!existedUser){
            return res.redirect("/home")
        }        
        return next()
    }catch(e){
        return res.redirect("/home")
    }
}