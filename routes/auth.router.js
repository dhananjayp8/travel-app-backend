 const express = require('express');
 const User=require('../model/user.model')
 const CryptoJS=require('crypto-js');
 const jwt=require('jsonwebtoken');


const router = express.Router();



 router.route("/register")
     .post(async(req,res)=>{
       try{
          const newUser=new User({
           username:req.body.username,
            number:req.body.number,
            email:req.body.email,
             password:CryptoJS.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString()
            
           });
           const savedUser=await newUser.save();
           res.status(201).json(savedUser)
         }catch(error){
            console.log(error);
             res.status(500).json({message:'Error creating a server'});
        }
     })
     router.route("/login").post(async (req, res) => {
    try {
        const user = await User.findOne({ number: req.body.number });
        console.log("this is user :",user);
        if (!user) {
            return res.status(401).json({ message: "Invalid Mobile Number" });
        }

        const decryptedBytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY); 
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
        if (decryptedPassword != req.body.password) {
            return res.status(401).json({ message: "Incorrect Password" });
        }
    
        const {password,...rest}=user._doc;
        const accessToken=jwt.sign({username:user.username},process.env.ACCESS_TOKEN)

        res.json({...rest,accessToken});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;

 