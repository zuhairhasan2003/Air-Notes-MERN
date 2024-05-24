const express = require('express');
const router = express.Router();
const Notes = require('../models/Note');
const connectToDb = require('../db');
const authLogin = require('../middleware/checkIfLogin');
const Note = require('../models/Note');

connectToDb();

// Fetch all notes specefic to a user
router.get('/fetchallnotes', authLogin, async (req, res) =>{
    const notes = await Notes.find({"ownerId": req.user.userId});
    res.send(notes);
});


router.post('/addnote', authLogin, async(req, res) => {
    let error = {message: ""};
    try {
        if(!req.body.title || !req.body.description)
        {
            throw error;
        } 
        else
        {
            req.body.ownerId = req.user.userId;
            const newNote = new Notes(req.body);
            newNote.save();
            res.status(200).send("Note Added");
        }
    } 
    catch (error) {
        error.message = "Please enter title and description to add note";
        res.status(400).send(error.message);
    }
});


// Update a note using id of the note to be updated
router.patch('/updatenote/:id', authLogin, async (req, res) =>{
    let error = {message: ""};
    try {
        
        let foundNote = await Notes.findById(req.params.id);
        if(!foundNote)
        {
            error.message = "Invalid request";
            throw error;
        }
        if(foundNote.ownerId.toString() !== req.user.userId)
        {

            error.message = "Invalid request";
            throw error;
        }

        let {title, description} = req.body;
        let updatedData = {};

        if(title)
        {
            updatedData.title = title;
        }
        if(description)
        {
            updatedData.description = description;
        }

        await Notes.findByIdAndUpdate(req.params.id, updatedData);
        res.status(200).send("Note Updated");
    } 
    catch (error) {
        res.status(400).send(error.message);
    }
});


// Delete a note using id of the note
router.delete('/deletenote/:id' , authLogin, async (req, res) =>{

    let error = {message: ""};

    try {

        let foundNote = await Notes.findById(req.params.id);
        if(!foundNote){
            error.message = "Invalid request";
            throw error;
        }
        if(foundNote.ownerId.toString() !== req.user.userId){
            error.message = "Invalid request";
            throw error;
        }

        await Notes.findByIdAndDelete(foundNote.id);
        res.status(200).send("Note deleted");
    } 
    catch (error) {
        res.status(404).send(error.message);
    }

});

module.exports = router;