import React from 'react'

export default function DedicatedNetwork() {
    return (
        <div>
            DedicatedVPN
           { console.log(  process.env.REACT_APP_HOST_URL + "/verify")}
        </div>
    )
}
