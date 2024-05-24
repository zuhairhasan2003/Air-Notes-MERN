import React, { useState } from "react";
import NoteContext from "./NoteContext";



function NoteState (props) {
    const [notes, setnotes] = useState([]);

    const addNoteToDb = async (note) =>{

        let data = {
            title: note.title,
            description: note.description
        }
        let response = await fetch("http://localhost:5000/auth/notes/addnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("userAuthToken")              
            },
            body: JSON.stringify(data)
        })
        alert(await response.text());
    }

    const fetchAllNotes = async () =>{
        let response  = await fetch("http://localhost:5000/auth/notes/fetchallnotes",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("userAuthToken")   
            }
        })
        if(response.status === 200)
        {
            let jsonResponse = await response.json();
            setnotes(jsonResponse);
        }
        else{
            alert(await response.text());
        }
    }

    const deleteNote = async (id) =>{
        const response = await fetch(`http://localhost:5000/auth/notes/deletenote/${id}` , {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("userAuthToken")   
            }
        });
        alert(await response.text());
    }

    const updateNote = async (note) =>{
        let data = {
            title : note.title,
            description: note.description
        };
        console.log(JSON.stringify(data));
        const response = await fetch(`http://localhost:5000/auth/notes/updatenote/${note._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("userAuthToken")   
            },
            body: JSON.stringify(data)
        });
        
        alert(await response.text());
    }

    return (
        <NoteContext.Provider value={{notes, setnotes, fetchAllNotes, deleteNote, addNoteToDb, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;