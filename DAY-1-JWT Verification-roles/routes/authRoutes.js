const express = require('express');
const { signup, login,updateuser,deleteuser } = require('../controllers/authController');
const {requireSignin,isAdmin}= require('../middleware/jwt_verification')
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);
router.put('/updateuser', requireSignin,isAdmin, updateuser)
router.delete('/deleteuser', requireSignin,isAdmin, deleteuser)
module.exports = router;
