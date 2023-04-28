import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/Notes/noteContext'
import Notesitem from './Notesitem';

const Notes = () => {
    // fetching the notes form the noteState.js file using useContext.
    const context = useContext(NoteContext)
    const { notes, setNotes, getAllNotes } = context;
    // we are using useEffect here so that we can call getAllNotes function without calling it manually.
    useEffect(()=>{
        getAllNotes()
    },[])
    return (
        <div className='container'>
        <div className="row " >
            <h2>Your Notes  </h2>
            {notes && notes.map((note) => {
                return  <Notesitem key={note._id} note={note} />
            })}
        </div>
        </div>
    )
}

export default Notes
