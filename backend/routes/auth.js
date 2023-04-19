const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { validationResult, body }
    = require('express-validator');


router.post('/', [
    body('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({ min: 10, max: 30 }),
    body('name', 'Name length should be greater than 5')
        .isLength({ min: 5 }),
    body('password', 'Password length should be greater than 8')
        .isLength({ min: 8 })
], (req, res) => {
    // const errors = validationResult(req);

    // // If some error occurs, then this
    // // block of code will run
    // if (!errors.isEmpty()) {
    //     res.json(errors)
    // }

    // // If no error occurs, then this
    // // block of code will run
    // else {
    //     res.send("Successfully validated")
    //     // ! here we are basically creating an instance of User and passing the data from request to create an object in the database.
    //     const user = new User(req.body)
    //     //* we are saving the data so that it will reflect the changes in the database.
    //     user.save()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user))
    .catch(err => console.log(err))
}
)

module.exports = router;