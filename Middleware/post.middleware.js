
const express = require("express")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const authenticate= (req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, 'imran', (err, decoded)=> {
            if (decoded){
                req.body.user=decoded.userID
                next()
            }
            else if(err) res.send({"msg":"please login first","error":err})
          });
    }
}

module.exports={
    authenticate
}