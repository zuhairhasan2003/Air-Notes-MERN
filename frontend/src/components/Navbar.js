import React from 'react'
import { Link, useLocation } from "react-router-dom";

function Navbar() {

    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Your notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/addNotes" ? "active" : ""}`} to="/addNotes">Add new note</Link>
                        </li>
                    </ul>
                </div>
            <button type="button" className="btn btn-dark mx-1" onClick={()=>{localStorage.removeItem("userAuthToken"); window.open("/login", "_self")}}>Log out</button>
            </div>
        </nav>
    )
}

export default Navbar