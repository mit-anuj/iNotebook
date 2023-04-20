const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/getuser')
const Notes = require('../models/Notes')
const { validationResult, body } = require('express-validator');



// ROUTE 1: (GET) get all the notes of the user
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        // we will get the user id form the middleware.
        // this will get all the notes of the database for the respective user.
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error: 'internal server error'
        })
    }
})


// ROUTE 2: (POST) create a new note.
router.post('/newnote', [
    body('title', 'Email length should be 10 to 30 characters')
        .isLength({ min: 3 }),
    body('description', 'Password length should be greater than 8')
        .isLength({ min: 8 })
], fetchUser, async (req, res) => {
    try {
        // checking if the data coming from the user is valid or not , if not send the bad request.
        const errors = await validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        // destructing the object that we received thorugh the req body
        const { title, description, tag } = req.body;
        // creating the new note
        const notes = new Notes({
            title, description, tag, user: req.user.id,
        })
        // saving the note
        const savedNote = await notes.save()

        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error: 'internal server error'
        })

    }
})

module.exports = router;