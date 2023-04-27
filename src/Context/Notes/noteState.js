import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // for the time being we are hard coding the notes of the user.
    const initialNotes = [
        {
            "_id": "64419a7645da3920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a7645da23920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a7645da43920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a76145da3920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
        {
            "_id": "64419a76452da3920c154d712",
            "user": "644035d16d85b013b0ca09eb",
            "title": "blog",
            "description": "creating a new web app which will store the notes on the cloud",
            "date": "2023-04-20T20:03:02.834Z",
            "__v": 0
        },
    ]
    const [notes, setNotes]= useState(initialNotes);

    // Add note
    const addNote = (title,description,tag)=>{
        console.log("heiodijfadj")
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
    const deleteNote = ()=>{

    }

    // edit note
    const editNote = ()=>{

    }
    return (
        <NoteContext.Provider value={{notes,setNotes,addNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;