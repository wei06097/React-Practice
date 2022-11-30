import './Login.css'
import * as cookie from '../cookie'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {API_LOGIN} from '../../constant'

function isBlank(...list) {
    for (let i=0; i<list.length; i++) {
        if (list[i] === '') return true
    }
    return false
}

async function fetchAPI(payload) {
    try {
        const res = await fetch(API_LOGIN, payload)
        const data = await res.json()
        return Promise.resolve(data)
    } catch {
        return Promise.reject()
    }
}

export default function Login() {
    const [flag, setFlag]  = useState(false)
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const handleAccount = (e) => setAccount(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    useEffect( () => {
        cookie.checkUser()
        .then( () => window.location.href = '/homepage' )
    }, [])
    const submitForm = (e) => {
        e.preventDefault()
        setFlag(true)
        const payload = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                account,
                password
            })
        }
        if (isBlank(account, password)) {
            setFlag(false)
            alert('輸入不可為空白')
        } else {
            fetchAPI(payload)
            .then( (data) => {
                setFlag(false)
                if (!data.success) {
                    alert(data.message)
                    setPassword('')
                } else {
                    alert(data.message)
                    cookie.set(data.token)
                    window.location.href = '/homepage'
                }
            })
            .catch( () => {
                setFlag(false)
                alert('伺服器沒有回應') 
            })
        }
    }

    return (<div className='login-page'>
        <form onSubmit={submitForm} className='login'>
            <h1>登入頁面</h1>
            <input type="text" placeholder='帳號' onChange={handleAccount} value={account} />
            <input type="password" placeholder='密碼' onChange={handlePassword} value={password} autoComplete="on" />
            <input type="submit" value="登入" disabled={flag}/>
            <Link to='/register' className='link'>註冊帳號</Link>
        </form>
    </div>)
}