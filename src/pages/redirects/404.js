import React from 'react'

const gotoDashboard=()=>{
    window.location = process.env.REACT_APP_HOST_URL 
}
export default function Notfound() {
    return (
        <div>
            <button onClick={gotoDashboard}>go to dashboard</button>
        </div>
    )
}
