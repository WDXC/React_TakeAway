import React from 'react'
import { Redirect,useLocation } from 'react-router-dom'

export default function Main() {
    const location = useLocation()
    console.log(location);
    return (
        <div>
            {
                location.state === undefined ?
                <Redirect to={'/signin'}/> :
                null
            }
            <h2>This is Main Page...</h2>
        </div>
    )
}
