import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
    return (
        <div className='center'>
            <Link to="/dash">
            <button >go to dashboard</button>
            </Link>
        </div>
    )
}
