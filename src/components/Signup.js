import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials,setCredentials]=useState({fullName:'',email:'',password:'',cpassword:''})
  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.cpassword!==credentials.password) {
      props.showAlert("password does not match",'danger');
    }else{
      const requestOptions = {
          method: 'POST',
          headers: {
              "content-type": "application/json"
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password,name: credentials.fullName })
      };
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, requestOptions);
      const note = await response.json();
      if(note.success){
          localStorage.getItem('auth-token',note.authenticationToken)
          // ! this will check if the credentials are valid or not. If yes,then it will redirect.
          navigate("/");
          props.showAlert("Account created successfully","success");
  
      }else{
        props.showAlert("Invalid Details","danger");
      }
    }
}
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
  }
  return (
    <div className='container'>
      <h2 className='mt-1'>Signup to continue with iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
          <input type="text" className="form-control" name="fullName" id="fullName" onChange={onChange} minLength={3}required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp"onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password"onChange={onChange} minLength={5}required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' id="cpassword"onChange={onChange} minLength={5}required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
