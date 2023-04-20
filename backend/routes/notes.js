const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/getuser')
const Notes = require('../models/Notes')
const { validationResult, body } = require('express-validator');



// ROUTE 1: (GET) get all the notes of the user  Login required
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


// ROUTE 2: (POST) create a new note.  Login required
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

// Route 3: (PATCH) Update an existing note  Login required 
router.patch('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        
        // destructing the object that we received thorugh the req body
        const { title, description, tag } = req.body;
        // only adding those values to the object that we received thorugh the req.
        const newNote= {};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }
        // here we are checking whether that particular note exists in the database or not.
        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).json({error: 'note not found'})
        }
        //! checking whether the logged in user is allowed to update that particular note or not.
        if(note.user.toString() !== req.user.id){
            return res.send('not allowed')
        }
        //! if the user is verified then we are updating the note .
        const updatenote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})

        res.json(updatenote)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error: 'internal server error'
        })

    }
})

// Route 4: (DELETE) Delete an existing note  Login required 
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // here we are checking whether that particular note exists in the database or not.
        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).json({error: 'note not found'})
        }
        //! checking whether the logged in user is allowed to update that particular note or not.
        if(note.user.toString() !== req.user.id){
            return res.send('not allowed')
        }
        //! if the user is verified then we are updating the note .
        const updatenote = await Notes.findByIdAndDelete(req.params.id)

        res.status(200).json({'success': 'note is successfully deleted',updatenote})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error: 'internal server error'
        })

    }
})

module.exports = router;