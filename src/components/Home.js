import React from 'react'
import Notes from './Notes'

import AddNote from './AddNote'

function Home(props) {
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <Notes showAlert = {props.showAlert}/>
    </>
  )
}

export default Home
