const bcrypt = require('bcrypt');
// import * as bcrypt from 'bcryptjs'
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');

//! this is the jwt key that we will use to generate the jwt token.
const JWT_KEY='authKey@12#3'

router.post('/createUser', [
    // writing the validations
    body('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({ min: 10, max: 30 }),
    body('name', 'Name length should be greater than 5')
        .isLength({ min: 5 }),
    body('password', 'Password length should be greater than 8')
        .isLength({ min: 8 })
], async (req, res) => {
    // checking if the data coming from the user is valid or not , if not send the bad request.
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        //! checking if this email already exists in the database or not.
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ 'error': ' user with email already exists' })
        }
        else {  
            // this is the data that we are passing in the jwt method.
            const data={
                user:{
                    id: req.body.id
                }
            }
            //! this will create a salt for me 
            const genSalt= await bcrypt.genSalt(10);
            //! this will append the password that is coming form the user and the salt and then it will generate a hash code of it
            const secPass = await bcrypt.hash(req.body.password, genSalt)
            await User.create({
                name: req.body.name,
                // password: req.body.password,
                //! now we are storing the hash code into the database
                password: secPass,
                email: req.body.email,
            })
            // res.status(200).json({ 'status': 'ok' })
            //! this will create a token for us 
            const authenticationToken = jwt.sign(data, JWT_KEY)
            res.send(authenticationToken).status(200)
        }
    } catch (error) {
        console.error(error.message)
        res.send('something went wrong').status(500)
    }
}
)

module.exports = router;