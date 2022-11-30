import './Homepage.css'
import * as cookie from '../cookie'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Homepage() {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    useEffect(  () => {
        cookie.checkUser()
        .then( data => setUser(data.user) )
        .catch( () => navigate('/login') )
    }, [navigate])
    const logout = () => {
        cookie.remove()
        navigate('/login')
    }
    return (<>
        <div>{user}</div>
        <button onClick={logout}>登出</button>
    </>)
}