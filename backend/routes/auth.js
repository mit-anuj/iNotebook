const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { validationResult, body }
    = require('express-validator');


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
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            })
            res.status(200).json({ 'status': 'ok' })
        }
    } catch (error) {
        console.error(error.message)
        res.send('something went wrong').status(500)
    }


    // this will send the response to the page in the json format.
    // .then(user => res.json(user))
    // .catch(err => console.log(err))
}
)

module.exports = router;