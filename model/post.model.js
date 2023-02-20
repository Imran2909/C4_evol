const express= require("express")
const mongoose  = require("mongoose")
const {connection}= require("../db")

const postSchema= mongoose.Schema({
    title:String ,
    body:String ,
    advice:String ,
    no_of_comments:Number ,
    user:String
})

const postModel= mongoose.model("posts",postSchema)

module.exports={
    postModel
}