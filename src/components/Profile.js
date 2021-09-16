import React, { useEffect } from 'react';

export const Profile = ({ token }) => {
    useEffect(() => {
        // axios.get('', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `token ${token}`
        //     }
        // }).then((response) => response.data)
    })
    
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

