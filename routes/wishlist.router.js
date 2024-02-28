const express=require('express');
const Wishlist=require("../model/wishlist.model");

const router=express.Router();

router.route("/")
.post(async(req,res)=>{
    const newWishlist=new Wishlist(req.body);
    try{
        const savedWishlist=await newWishlist.save();
        res.status(201).json(savedWishlist);
    }catch(error){
        res.status(500).json({message:"Failed to connect"});
    }

})
module.exports=router;