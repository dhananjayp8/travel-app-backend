 const express = require('express');
 const User=require('../model/user.model')
 const CryptoJS=require('crypto-js');
 const jwt=require('jsonwebtoken');
 const singupHandler=require('../controllers/signupController');
 const loginHandler=require('../controllers/loginController');

const router = express.Router();



 router.route("/register")
     .post(singupHandler)
       
 router.route("/login")
  .post(loginHandler)
  
module.exports = router;

 