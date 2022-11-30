import './Login.css'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {API_LOGIN} from '../../constant'

function isBlank(...list) {
    for (let i=0; i<list.length; i++) {
        if (list[i] === '') return true
    }
    return false
} 

export default function Login() {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const handleAccount = (e) => setAccount(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const submitForm = (e) => {
        e.preventDefault()
        if (isBlank(account, password)) {
            alert('輸入不可為空白')
        } else {
            fetch(API_LOGIN, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    account,
                    password
                })
            })
            .then(res => res.json())
            .then( (data) => {
                if (!data.success) {
                    alert(data.message)
                    setPassword('')
                } else {
                    alert(data.message)
                    // 登入成功 跳轉
                }
            })
        }
    }

    return (<div className='login-page'>
        <form onSubmit={submitForm} className='login'>
            <h1>登入頁面</h1>
            <input type="text" placeholder='帳號' onChange={handleAccount} value={account} />
            <input type="password" placeholder='密碼' onChange={handlePassword} value={password} autoComplete="on" />
            <input type="submit" value="登入"/>
            <Link to='/register' className='link'>註冊帳號</Link>
        </form>
    </div>)
}