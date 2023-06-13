import React, { useContext, useEffect, useRef ,useState} from 'react'
import NoteContext from '../Context/Notes/noteContext'
import Notesitem from './Notesitem';

const Notes = () => {
    // fetching the notes form the noteState.js file using useContext.
    const context = useContext(NoteContext)
    const { notes, getAllNotes,editNote} = context;
   const [note,setNote]= useState({id: "", etitle: '', edescription: '', etag: ''})
   const refClose = useRef(null);
   const ref = useRef(null)
   
    // we are using useEffect here so that we can call getAllNotes function without calling it manually.
    useEffect(() => {
        getAllNotes()
    }, [])

    const updateNote = (note) => {

        ref.current.click()
        setNote({id: note._id,etitle: note.title, edescription: note.description, etag: note.tag})
    }

    const handleClick= (e)=>{

        editNote(note.id,note.etitle,note.edescription,note.etag)
        e.preventDefault();
        refClose.current.click();
    }
    
    const handleOnChange = (e)=>{
        //! iska matlab yee hai ki jo bhi value note mai hai voo rhe or usme joo bhi nyi value aa rhi vo add/overwrite hoo jye.
        // isme hum essa islye kar rhe hai kyunki isme 3 values change hooo rhi hai, taki eek time pr eek hii value change ho islye yee kia humne.
        setNote({...note,[e.target.name]: e.target.value})

    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden={true}>

            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={handleOnChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={handleOnChange} minLength={8} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={handleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref= {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edescription.length<8 || note.etitle.length<5} onClick = {handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row " >
                    <h2>Your Notes  </h2>
                    <div className="container mx-4">
                        {notes.length === 0 && "No notes to display"}
                    </div>
                    {notes && notes.map((note) => {
                        return <Notesitem key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
