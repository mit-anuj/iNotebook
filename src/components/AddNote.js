import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Notes/noteContext';

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context;
   const [note,setNote]= useState({title: '', description: '', tag: ''})

    const handleOnClick = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description)
    }
    
    const handleOnChange = (e)=>{
        //! iska matlab yee hai ki jo bhi value note mai hai voo rhe or usme joo bhi nyi value aa rhi vo add/overwrite hoo jye.
        // isme hum essa islye kar rhe hai kyunki isme 3 values change hooo rhi hai, taki eek time pr eek hii value change ho islye yee kia humne.
        setNote({...note,[e.target.name]: e.target.value})

    }

    return (
        <div>
            <div className='container my-3'>
                <h2>Add Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title'onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" id="description" name='description' onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
