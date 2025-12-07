export const isAdmin = async (req, res, next) => {
    try{
        if(req?.session?.user?.role != "admin"){
            throw new Error("NOT ADMIN")
        }
        return next()
    }catch(e){
        throw new Error("PROBLEM WITH ADMIN")
    }
}