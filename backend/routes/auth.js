const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/getuser');

//! this is the jwt key that we will use to generate the jwt token.
const JWT_KEY = 'authKey@12#3'

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
            return res.status(400).json({ 'error': ' user with email already exists' })
        }
        else {

            //! this will create a salt for me 
            const genSalt = await bcrypt.genSalt(10);
            //! this will append the password that is coming form the user and the salt and then it will generate a hash code of it
            const secPass = await bcrypt.hash(req.body.password, genSalt)
            await User.create({
                name: req.body.name,
                //! now we are storing the hash code into the database
                password: secPass,
                email: req.body.email,
            })
            // this is the data that we are passing in the jwt method.
            const data = {
                user: {
                    id: user.id
                }
            }
            //! this will create a token for us 
            const authenticationToken = jwt.sign(data, JWT_KEY)
            res.json(authenticationToken).status(200)
        }
    } catch (error) {
        console.error(error.message)
        res.send('something went wrong').status(500)
    }
}
)

router.post('/login', [
    // writing the validations
    body('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({ min: 10, max: 30 }),
    body('password', 'Password must not be empty')
        .exists()
], async (req, res) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        //! checking if the the given email exists in the database or not, if yes then storing the object in user variable. 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: 'Invalid credentials ' })
        }
        //* checking if the password given by the user is matching with the password that is stored in the database with the given email.
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(400).json({ errors: 'Invalid credentials ' })
        }
        // this is the data that we are passing in the jwt method.
        const data = {
            user: {
                id: user.id
            }
        }
        //! this will create a token for us 
        const authenticationToken = jwt.sign(data, JWT_KEY)
        res.status(200).json(authenticationToken)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('something went wrong')
    }

})

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('something went wrong')
    }
})

module.exports = router;