import React from 'react'

export default function User({ details }) {
    if(!details) {
        return <h3> Catching your user details...</h3>
    }

    return (
        <div className= 'user container'>
            <h3>{details.first_name}</h3>
            <h3>{details.name}</h3>
            <p>email: {details.email}</p>
        </div>
    )
}

