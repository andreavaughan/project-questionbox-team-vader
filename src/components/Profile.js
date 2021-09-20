import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Profile = ({ token, user }) => {
    
    
    useEffect(() => {
        
        
    }, [token])
    

    console.log(user)

    return (
        <div>
            <h1>Profile</h1>
            <h3>{user.username}</h3>
            <p>{user.first_name} {user.last_name}</p>
        </div>
    );
}

