const express = require('express');
const router = express.Router();
const User = require('../models/User');
const connectToDb = require('../db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const authLogin = require('../middleware/checkIfLogin');

const JWT_SECRET = "This is developed by zuhair hasan raza";
// Connecting to db
connectToDb();



router.post('/signup', async (req, res)=>{

    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let nameRegex = /([a-zA-Z0-9_\s]+)/;
    // password must be alpha neumeric
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const findUser = await User.findOne({email: req.body.email});

    try
    {
        if(!findUser && req.body.name.match(nameRegex) && req.body.email.match(emailRegex) && req.body.password.match(passwordRegex))
        {
            // Encrypting password using salt and hash
            var salt = bcrypt.genSaltSync(10);
            var hashPass = bcrypt.hashSync(req.body.password, salt);
            // Now store hash password in your db

            const newUser = new User({name: req.body.name, email: req.body.email, password: hashPass});
            newUser.save();

            // we will be sending a token to user
            const data = {userId: newUser.id};
            var token = jwt.sign(data, JWT_SECRET);

            // If a user successfully signup a token is sent
            res.send({token})
        }
        else
        {
            let error = {message: ""};
            if(!req.body.name.match(nameRegex))
                error.message = "Enter valid name";
            else if(!req.body.email.match(emailRegex))
                error.message = "Enter valid email";
            else if(!req.body.password.match(passwordRegex))
                error.message = "Enter strong password";
            else if(findUser)
                error.message = "User already exists"

            throw error;
        }
    }
    catch(error)
    {
        // If a user is unable to signup an error message is sent
        res.status(400);
        res.send(error.message);
    }
    
});


router.post('/login', async (req, res)=>{

    const findUser = await User.findOne({email: req.body.email});
    var error = {message: ""};
    
    try {
        if(!findUser)
        {
            error.message = "Please enter valid credientials";
            throw error;
        }
        if(!bcrypt.compareSync(req.body.password, findUser.password))
        {
            error.message = "Please enter valid credientials";
            throw error;
        }
        else
        {
            // we will be sending a token to user
            const data = {userId: findUser.id};
            var token = jwt.sign(data, JWT_SECRET);
            res.send({token});
        }
    } 
    catch (error) {
        res.status(400);
        res.send(error);
    }
});


// This will only run when the user is checked that he has auth token in his header
router.post('/getUser', authLogin, async(req, res) =>{
    const user = await User.findById(req.user.userId).select("-password");

    // user will have the user that corresponds to the auth token
    res.send(user); 
});


module.exports = router;