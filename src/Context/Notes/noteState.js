import NoteContext from "./noteContext";

const NoteState = (props) => {
    const state={
        'name' : 'anuj',
        'Section' : 'F'
    }
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;