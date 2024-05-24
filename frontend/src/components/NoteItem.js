import React from 'react'


function NewsItem(props) {

  return (


      <div className="col-sm-4 my-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <p className="card-text">{props.note.description}</p>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{props.handleEdit(props.note)}}>Edit</button>
            <button className="btn btn-primary mx-1" onClick={()=>{props.handleDelete(props.note._id)}}>Delete</button>
          </div>
        </div>
      </div>
    
  )
}

export default NewsItem