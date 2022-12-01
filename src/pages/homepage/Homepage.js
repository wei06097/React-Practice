import './Homepage.css'
import * as cookie from '../cookie'
import React, {useState, useEffect, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Homepage() {
    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [component, setComponent] = useState('')
    useEffect( () => {
        cookie.checkUser()
        .then( data => {
            setData(data)
            setComponent('user')
        })
        .catch( () => setComponent('visitor') )
    }, [])
    
    const mainJSX = useCallback(() => {
        const logout = () => {
            cookie.remove()
            navigate('/login')
        }
        return <>
            <div>{data.user}</div>
            <button onClick={logout}>登出</button>
        </>
    }, [data])

    switch (component) {
        case 'user':
            return mainJSX()
        case 'visitor':
            window.location.href = '/login'
        default:
            return <></>
    }
}