import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // for the time being we are hard coding the notes of the user.
    const host = 'http://localhost:5000'
    const [notes, setNotes] = useState([]);

    // Fetch All Notes.
    const getAllNotes = async () =>{
         // API call
         const requestOptions = {
            method: 'GET',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDM1ZDE2ZDg1YjAxM2IwY2EwOWViIn0sImlhdCI6MTY4MjAxNjU5NH0.s-s5qiItP76T10cWvlx04UcYAS4wjy06K2O0SnZJ56M",
                "content-type": "application/json"
            },
        };
        const response = await fetch(`${host}/api/notes/fetchallnotes`, requestOptions);
        let initialNotes = await response.json();
        //! overwrite the value of notes with the new value we got form the api.
        setNotes(initialNotes)
    }

    // Add note
    const addNote = async (title, description, tag) => {
        // API call
        const requestOptions = {
            method: 'POST',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDM1ZDE2ZDg1YjAxM2IwY2EwOWViIn0sImlhdCI6MTY4MjAxNjU5NH0.s-s5qiItP76T10cWvlx04UcYAS4wjy06K2O0SnZJ56M",
                "content-type": "application/json"
            },
            body: JSON.stringify({title, description, tag})
        };
        const response = await fetch(`${host}/api/notes/newnote`, requestOptions);
        console.log(await response.json())
        let note = {
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
    const deleteNote = async (id) => {
        // API call
        const requestOptions = {
            method: 'DELETE',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDM1ZDE2ZDg1YjAxM2IwY2EwOWViIn0sImlhdCI6MTY4MjAxNjU5NH0.s-s5qiItP76T10cWvlx04UcYAS4wjy06K2O0SnZJ56M",
                "content-type": "application/json"

            },

        };
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, requestOptions);
        const data = await response.json();

        // using filter we can find the note with the given id and filter function will return a new array withour that note.
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    // edit note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const requestOptions = {
            method: 'PATCH',
            headers: {"content-type": "application/json"
        },
            body: JSON.stringify({ title, description, tag })
        };
        const response = await fetch(`${host}api/notes/updatenote/${id}`, requestOptions);
        const data = await response.json();
        //
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;