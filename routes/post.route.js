
const express = require("express")
const { postModel } = require("../model/post.model")

const postRoute=express.Router()

postRoute.post("/lpost",async(req,res)=>{
    try {
        const payload= req.body
        const post= new postModel(payload)
        await post.save()
        res.end("Posted new post")   
    } catch (error) {
        res.end(error)
    }
})

postRoute.get("/top",async(req,res)=>{
    const data= await postModel.find({user:req.body.user})
    res.send(data)
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const ID= req.params.id
    await postModel.findByIdAndDelete({_id:ID})
    res.send("Note deleted")
})

postRoute.patch("/update/:id",async(req,res)=>{
    const ID= req.params.id
    const payload= req.body
    await postModel.findByIdAndUpdate({_id:ID},payload)
    res.send("Note updated")
})

module.exports={
    postRoute
}