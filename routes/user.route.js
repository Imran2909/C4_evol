const express = require("express")
const { userModel } = require("../model/user.model")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const userRoute = express.Router()
// userRoute.use(express.json())

userRoute.post("/register", async (req, res) => {
    const {name,email,gender,password,age,city} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) =>{
            if(err) res.end(err)
            else{
                const users = new userModel({name,email,gender,password:hash,age,city})
                await users.save()
                res.send("New user registered")
            }
        });       
    } catch (error) {
        res.send({"msg":"something went wrong","error":error})
    }
})

userRoute.post("/Login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user= await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if(err) res.send(err)
                else if (result){
                    const token = jwt.sign({ userID:user[0]._id}, 'imran');
                    res.send({"msg":"User logged in successful","token":token})
                }
            });
        }
        else{
            res.end("something went wrong")
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    userRoute
}