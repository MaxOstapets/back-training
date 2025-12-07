import express from "express"
import dotenv from "dotenv"
import { userRouter } from "./user/user.controller.js"
import path from "path"
import { dbConnect } from "./db/db.js"
import { productRouter } from "./product/product.controller.js"
import session from "express-session"
import MongoStore from "connect-mongo"

dotenv.config()
const PORT = process.env.PORT ?? 3000
const DB_URL = process.env.DB_URL
const SECRET = process.env.SECRET
const app = express()
app.use(express.json())
const __dirname = import.meta.dirname
dbConnect()

app.use(express.static('public'))

app.use(session({
    secret: SECRET,
    // cookie: { secure: true },
    ttl: 14 * 24 * 60 * 60 , // 10
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: DB_URL,
        dbName: "sessions"
    })
}));

app.use("/user", userRouter)
app.use("/products", productRouter)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get('/products', (req, res) => {
    res.render('pages/products', {title: "products"})
})

app.listen(PORT, () => {console.log(`Server running on ${PORT} lol`)})