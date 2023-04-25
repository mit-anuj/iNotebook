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
        }
    ]
    const [notes, setNotes]= useState(initialNotes);
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;