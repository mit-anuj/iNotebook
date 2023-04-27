import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/noteContext'
import Notesitem from './Notesitem';

const Notes = () => {
    // fetching the notes form the noteState.js file using useContext.
    const context = useContext(NoteContext)
    const { notes, setNotes } = context;
    return (
        <div className='container'>
        <div className="row " >
            <h2>Your Notes  </h2>
            {notes.map((note) => {
                return  <Notesitem key={note._id} note={note} />
            })}
        </div>
        </div>
    )
}

export default Notes
