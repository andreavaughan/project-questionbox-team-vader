import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Profile = ({ token }) => {
    const [ user, setUser ] = useState('')
    
    useEffect(() => {
        axios.get('https://questionbox1.herokuapp.com/auth/users/me/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        }).then((response) => setUser(response.data))
    }, [setUser, token])
    

    console.log(user)

    return (
        <div>
            <h1>Profile</h1>
            <h3>{user.username}</h3>
            <p>{user.first_name} {user.last_name}</p>
        </div>
    );
}

