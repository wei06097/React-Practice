import './Homepage.css'
import * as cookie from '../cookie'
import React, {useState, useEffect} from 'react'

export default function Homepage() {
    const [user, setUser] = useState('')
    useEffect(  () => {
        cookie.checkUser()
        .then( data => setUser(data.user) )
        .catch( () => window.location.href = '/login' )
    }, [])
    const logout = () => {
        cookie.remove()
        window.location.href = '/login'
    }
    return (<>
        <div>{user}</div>
        <button onClick={logout}>登出</button>
    </>)
}