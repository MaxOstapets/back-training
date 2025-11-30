import express from "express"
import dotenv from "dotenv"
import { todoRouter } from "./controllers/index.js"
import { userRouter } from "./user/user.controller.js"
import path from "path"
import {users} from "./users.data.js"
import { dbConnect } from "./db/db.js"
import session from "express-session"
import MongoStore from "connect-mongo"

const PORT = process.env.PORT ?? 3000
const app = express()
app.use(express.json())
dotenv.config()
const __dirname = import.meta.dirname
dbConnect()

app.use(express.static('public'))

app.use(session({
    secret: 'foo', // TODO: Replace to env
    cookie: { secure: true },
    ttl: 14 * 24 * 60 * 60 , // 10
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://user1:hello12345@test1.dk3nrv3.mongodb.net/?appName=test1", // TODO: Replace to env
        dbName: "sessions"
    })
  }));
// mongodb+srv://maks:WHkvu$M2er%9Y_F@test1.dk3nrv3.mongodb.net/?appName=test1
app.use("/user", userRouter)
app.use("/todo", todoRouter)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get('/', (req, res) => {
    res.render('pages/home', {title: "home", users})
})

app.get('/about-us', (req, res) => {
    res.render('pages/about-us', {title: "about-us"})
})

app.get('/join-to-team', (req, res) => {
    res.render('pages/join-to-team', {title: "join-to-team"})
})

app.get('/products', (req, res) => {
    res.render('pages/products', {title: "products"})
})

app.listen(PORT, () => {console.log(`Server running on ${PORT} lol`)})