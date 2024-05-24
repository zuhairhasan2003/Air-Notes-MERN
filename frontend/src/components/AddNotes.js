import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/NoteContext';

function AddNotes() {

  let {notes, setnotes, addNoteToDb} = useContext(NoteContext);

  useEffect(() => {
    if(!localStorage.getItem("userAuthToken"))
      window.open("/login", "_self");
    // eslint-disable-next-line
  }, [])

  const addNote = (event) =>{
    event.preventDefault();
    let newNote = {
      title: "",
      description: ""
    }
    if(document.querySelector(".addNoteTitleInput").value !== "" && document.querySelector(".addNoteDescriptionInput").value !== "")
    {
      newNote.title = document.querySelector(".addNoteTitleInput").value;
      newNote.description = document.querySelector(".addNoteDescriptionInput").value;


      let notesCopy = notes.map((singleNote)=>{return singleNote});
      notesCopy.push(newNote);
      console.log(newNote)

      setnotes(notesCopy);
      addNoteToDb({title: newNote.title, description: newNote.description});

      document.querySelector(".addNoteDescriptionInput").value = "";
      document.querySelector(".addNoteTitleInput").value = "";

      
    }
    else{
      alert("Add title and description to note")
    }
  }

  return (
    <div className="container my-3">
      <h1>Add Note</h1>
      <hr />
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input type="text" className="form-control addNoteTitleInput my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input type="text" className="form-control addNoteDescriptionInput" id="exampleInputPassword1" placeholder="Enter description" />
        </div>
        <button onClick={addNote} type="submit" className="btn btn-primary my-3">Save Note</button>
      </form>
    </div>
  )
}

export default AddNotes;