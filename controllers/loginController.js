const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require("../model/user.model");

const loginHandler=async(req,res)=>{
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
}
module.exports=loginHandler;

/**try {
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
    } */