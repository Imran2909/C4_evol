const express= require("express")
const {connection}= require("./db")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const app= express()
app.use(express.json())
const cors= require("cors")
app.use(cors())
const {userRoute}= require("./routes/user.route")
const {postRoute}= require("./routes/post.route")
const {authenticate}= require("./Middleware/post.middleware")
app.get("/",(req,res)=>{
    res.end("Welcome to C4 Evolution")
})

app.use("/users",userRoute)
app.use(authenticate)
app.use("/posts",postRoute)

app.listen(2020,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running at port 2020")
})