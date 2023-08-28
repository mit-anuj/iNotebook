import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        };
        const response = await fetch(`http://localhost:5000/api/auth/login`, requestOptions);
        // console.log(await response.json())
        const note = await response.json();
        if(note.success){
            localStorage.setItem('auth-token',note.authenticationToken)
            // ! this will check if the credentials are valid or not. If yes,then it will redirect.
            props.showAlert("Logged in successfully","success");
            navigate("/");

        }else{
            props.showAlert('Invalid credentials','danger');
        }
    }
    return (
        <div className='container'>
            <h2 className='my-2'>Login to Continue with iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" minLength={5}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
