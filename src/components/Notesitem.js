import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/noteContext'

function Notesitem(props) {
    const {note}= props
    const context = useContext(NoteContext)
    const {deleteNote, editNote}= context;
    return (
        <div className='col-md-3 my-3'>
            <div className="card " >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* we are adding an onclick event listener to the trash icon so that it can delete the respective note. */}
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editNote(note._id)}}></i>
                    {props.note.note}
                </div>
            </div>
        </div>
    )
}

export default Notesitem
