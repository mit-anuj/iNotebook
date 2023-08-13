import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const [notes, setNotes] = useState([]);

    // Fetch All Notes.
    const getAllNotes = async () =>{
         // API call
         const requestOptions = {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('auth-token'),
                "content-type": "application/json"
            },
        };
        const response = await fetch(`${host}/api/notes/fetchallnotes`, requestOptions);
        let initialNotes = await response.json();
        // console.log("this is working")
        //! overwrite the value of notes with the new value we got form the api.
        setNotes(initialNotes)
    }

    // Add note
    const addNote = async (title, description, tag) => {
        // API call
        const requestOptions = {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('auth-token'),
                "content-type": "application/json"
            },
            body: JSON.stringify({title, description, tag})
        };
        const response = await fetch(`${host}/api/notes/newnote`, requestOptions);
        // console.log(await response.json())
        const note = await response.json();
        // using concat to return a new array.
        setNotes(notes.concat(note))
    }

    // Delete note
    const deleteNote = async (id) => {
        // API call
        // through this we can delete the note from the database.
        const requestOptions = {
            method: 'DELETE',
            headers: {
                "auth-token": localStorage.getItem('auth-token'),
                "content-type": "application/json"
            },
        };
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, requestOptions);
        //eslint-disable-next-line
        const data = await response.json();

        // through this we can delete the note from the webpage.
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
            headers: {
                "content-type": "application/json",
                'auth-token':localStorage.getItem('auth-token')
        },
            body: JSON.stringify({ title, description, tag })
        };
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, requestOptions);
        //eslint-disable-next-line
        const data = await response.json();
        // console.log(data)
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