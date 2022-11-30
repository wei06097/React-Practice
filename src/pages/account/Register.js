import './Login.css'
import * as cookie from '../cookie'
import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {API_REGISTER} from '../../constant'

function isBlank(...list) {
    for (let i=0; i<list.length; i++) {
        if (list[i] === '') return true
    }
    return false
}

async function fetchAPI(payload) {
    try {
        const res = await fetch(API_REGISTER, payload)
        const data = await res.json()
        return Promise.resolve(data)
    } catch {
        return Promise.reject()
    }
}

export default function Register() {
    const navigate = useNavigate()
    const [flag, setFlag]  = useState(false)
    const [username, setUsername] = useState('')
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const handleUsername = (e) => setUsername(e.target.value)
    const handleAccount = (e) => setAccount(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handlePassword2 = (e) => setPassword2(e.target.value)
    useEffect( () => {
        cookie.checkUser()
        .then( () => navigate("/homepage") )
    }, [navigate])
    const submitForm = (e) => {
        e.preventDefault()
        setFlag(true)
        const payload = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                account,
                password
            })
        }
        if (isBlank(username, account, password, password2)) {
            setFlag(false)
            alert('輸入不可為空白')
        } else if (password !== password2) {
            setFlag(false)
            alert('密碼不一致')
            setPassword('')
            setPassword2('')
        } else {
            fetchAPI(payload)
            .then ( (data) => {
                setFlag(false)
                if (data.success) setUsername('')
                setAccount('')
                setPassword('')
                setPassword2('')
                alert(data.message)
            })
            .catch( () => {
                setFlag(false)
                alert('伺服器沒有回應') 
            })
        }
    }

    return (<div className='login-page'>
        <form onSubmit={submitForm} className='login'>
            <h1>註冊頁面</h1>
            <input type="text" placeholder='使用者名稱' onChange={handleUsername} value={username} />
            <input type="text" placeholder='帳號' onChange={handleAccount} value={account} />
            <input type="password" placeholder='密碼' onChange={handlePassword} value={password} autoComplete="on" />
            <input type="password" placeholder='確認密碼' onChange={handlePassword2} value={password2} autoComplete="on" />
            <input type="submit" value="註冊" disabled={flag} />
            <Link to='/login' className='link'>登入</Link>
        </form>
    </div>)
}