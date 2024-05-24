import React from 'react'


function Signup() {

  const signUpReq = async (event) =>{
    event.preventDefault();

    let error = {message : ""};

    try{
      if(document.getElementById('exampleInputPassword1').value === document.getElementById('confirmPasswordInput').value)
        {
          const data = {
            name: document.getElementById('fullNameInput').value,
            email: document.getElementById('exampleInputEmail1').value,
            password: document.getElementById('exampleInputPassword1').value
          }
          const url = "http://localhost:5000/auth/signup"

          let response = await fetch(url , {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
          });
          if(response.status === 400)
          {
            error.message = await response.text();
            throw error;
          }
          else{
            alert("User created");
            let jsonResponse = await response.json();
            localStorage.setItem("userAuthToken", jsonResponse.token);
            window.open("/", "_self");
          }
        }
        else{
          error.message = "passwords dont match"
          throw error;
        }
    }
    catch(error)
    {
      alert(error.message);
    }
  }


  return (
    <div className="container" style={{ marginTop: "10vh" }}>
      <h1>SignUp</h1>
      <hr />
      <form>

        <div className="mb-3">
          <label htmlFor="fullNameInput" className="form-label">Full name</label>
          <input type="text" className="form-control" id="fullNameInput" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPasswordInput" className="form-label">Confirm password</label>
          <input type="password" className="form-control" id="confirmPasswordInput" required/>
        </div>

        <button type="submit" className="btn btn-primary" onClick={signUpReq}>Submit</button>
      </form>
    </div>
  )
}

export default Signup