import React from 'react'
import NoteItem from './NoteItem'
import { useContext, useState, useEffect } from "react";
import NoteContext from '../context/NoteContext';
import EditModal from './EditModal';


function Home() {

  let { notes, setnotes, fetchAllNotes, deleteNote, updateNote } = useContext(NoteContext);
  const [editedNote, seteditedNote] = useState(null);

  useEffect(() => {
    if(!localStorage.getItem("userAuthToken"))
      window.open("/login", "_self");
    if(localStorage.getItem("userAuthToken"))
      fetchAllNotes()
    // eslint-disable-next-line
  }, [])
  

  const handleDelete = (id) =>{

    let newNotes = notes.filter((singleNote) =>{
      return singleNote._id !== id;
    })
    setnotes(newNotes);
    deleteNote(id);
  }

  const handleEdit = (editedNote) =>{
    document.getElementById('recipient-name').value = editedNote.title;
    document.getElementById('message-text').value = editedNote.description;

    seteditedNote(editedNote);
  }

  const saveChanges = () =>{
    let newNotes = [] ;

    notes.forEach(singleNote => {
      if(editedNote._id === singleNote._id)
      {
        singleNote.title = document.getElementById('recipient-name').value;
        singleNote.description = document.getElementById('message-text').value;
        updateNote(singleNote);
      }      
        newNotes.push(singleNote);
      });
      
      setnotes(newNotes);
  }


  return (
    

    <div className="container my-3">
      
      <h1>Notes</h1>
      <hr />
      <div className="row">
        {
          notes && notes.map((singleNote) => {
            return <NoteItem key={singleNote._id} note = {singleNote} handleEdit = {handleEdit} handleDelete = {handleDelete} />
          })
        }
      </div>
      <EditModal saveChanges = {saveChanges}/>
    </div>


  )
}

export default Home