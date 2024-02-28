const express=require('express');
const router=express.Router();
const singleHotelHandler=require("../controllers/singleHotelController");
const Hotel=require('../model/hotel.model');
router.route("/:id")
     .get(singleHotelHandler);

 module.exports=router;    