const express = require('express');
const router = express.Router()
const User = require('../models/User')



router.get('/', (req, res) => {
    // res.send('welcome to auth');
    // res.send(req.body)
    // ! here we are basically creating an instance of User and passing the data from request to create an object in the database.
    const user = new User(req.body)
    //* we are saving the data so that it will reflect the changes in the database.
    user.save()
})

module.exports = router;