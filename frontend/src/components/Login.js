import React from 'react'
import { Link } from "react-router-dom";

function Login() {

  const loginReq = async (event) => {
    event.preventDefault();

    let error = { message: "" };

    let data = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    }

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    try {
      let jsonResponse = await response.json();
      if (jsonResponse.token) {
        if (localStorage.getItem("userAuthToken")) {
          localStorage.removeItem("userAuthToken");
        }
        else {
          localStorage.setItem("userAuthToken", jsonResponse.token);
          window.open("/", "_self");
        }
      }
      else {
        error.message = jsonResponse.message;
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  }


  return (
    <div className="container" style={{ marginTop: "10vh" }}>
      <h1>Login</h1>
      <hr />
      <form>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="loginPassword" />
        </div>
        <div id="passwordHelpInline" className="form-text">Create a new account. <Link to="/signup">Sign Up</Link> </div>
        <button type="submit" className="btn btn-primary my-2" onClick={loginReq}>Login</button>
      </form>
    </div>
  )
}

export default Login