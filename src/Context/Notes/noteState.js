import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // for the time being we are hard coding the notes of the user.
    const initialNotes = [
        {
            "_id": "64419a7645da3920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud 1",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a7645da23920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud 2",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a7645da43920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud 3",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a76145da3920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud 4",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a76452da3920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud 5",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
    ]
    const [notes, setNotes]= useState(initialNotes);

    // Add note
    const addNote = (title,description,tag)=>{
        let note={
            "_id": "64419a76452da39420c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": title,
            "description": description,
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        }
        // using concat to return a new array.
        setNotes(notes.concat(note))
    }

    // Delete note
    const deleteNote = (id)=>{
        // using filter we can find the note with the given id and filter function will return a new array withour that note.
        const newNotes =notes.filter((note)=>{
            return note._id!==id
        })
        setNotes(newNotes)
    }

    // edit note
    const editNote = ()=>{

    }
    return (
        <NoteContext.Provider value={{notes,setNotes,addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;