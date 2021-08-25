import React from 'react'

export default function NoNetwork({error}) {
    return (
        <div>
            <h3 className='center'>{error}</h3>
        </div>
    )
}
