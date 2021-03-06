import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

export const Register = ({ setAuth }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    
    const handleChange = (inputType, event) => {
        if (inputType === 'firstName'){
            setFirstName(event.target.value)
        }
        if (inputType === 'lastName'){
            setLastName(event.target.value)
        }
        if (inputType === 'email'){
            setEmail(event.target.value)
        }
        if (inputType === 'username'){
            setUsername(event.target.value)
        }
        if (inputType === 'password'){
            setPassword(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://questionbox1.herokuapp.com/auth/users/',
            {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "username": username,
                "password": password
            })
            .then(response => {
                if (response.status === 201) {
                    console.log('user created!')
                    return axios.post('https://questionbox1.herokuapp.com/auth/token/login/', {
                        username: username,
                        password: password
                    }).then((data) => {
                        if (data && data.data.auth_token) {
                            setAuth(data.data.auth_token)
                            history.push('/')
                        }
                    })
                } else {
                    console.log('there was an error, please try again')
                }
            })
    }

    return (
        <>
            <form className='form question-form' onSubmit={handleSubmit}>
                <label className="label">First Name</label>
                <input 
                    className="input form-control"
                    type="text"
                    value={firstName}
                    onChange={(event) => handleChange('firstName', event)}
                />
                <label className="label">Last Name</label>
                <input 
                    className="input form-control"
                    type="text"
                    value={lastName}
                    onChange={(event) => handleChange('lastName', event)}
                />
                <label className="label">Email</label>
                <input 
                    className="input form-control"
                    type="email"
                    value={email}
                    onChange={(event) => handleChange('email', event)}
                />
                <label className="label">Username</label>
                <input 
                    className="input form-control"
                    type="text"
                    value={username}
                    onChange={(event) => handleChange('username', event)}
                />
                <label className="label">Password</label>
                <input 
                    className="input form-control"
                    type="password"
                    value={password}
                    onChange={(event) => handleChange('password', event)}
                />
                <button type="submit" className="btn btn-secondary">Register</button>
                <button className="btn btn-light">Cancel</button>
            </form>
            <div>
                <p className="form-link">Already have an account? <Link to="/login" >Login here</Link>.</p>
            </div>
        </>
    );
}