const express=require('express');
const Wishlist=require("../model/wishlist.model");
const verifyUser=require("../middleware/verifyuser");

const wishlistController=require("../controllers/wishlistController");
const {createWishlistHandler,deleteWishlistHandler,getWishlistHandler}=wishlistController;
const router=express.Router();

router.route("/")
.post(verifyUser,createWishlistHandler);

router.route("/:id")
  .delete(verifyUser,deleteWishlistHandler);

router.route("/")
  .get(verifyUser,getWishlistHandler);
module.exports=router;