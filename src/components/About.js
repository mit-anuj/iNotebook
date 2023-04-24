import React,{ useContext } from 'react'
import noteContext from '../Context/Notes/noteContext'

function About() {
  const a = useContext(noteContext)
  return (
    <div>
      This is About of {a.name}
    </div>
  )
}

export default About
