import './Login.css'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {API_REGISTER} from '../constant'

function isBlank(...list) {
    for (let i=0; i<list.length; i++) {
        if (list[i] === '') return true
    }
    return false
} 

export default function Register() {
    const [username, setUsername] = useState('')
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const handleUsername = (e) => setUsername(e.target.value)
    const handleAccount = (e) => setAccount(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handlePassword2 = (e) => setPassword2(e.target.value)
    const submitForm = (e) => {
        e.preventDefault()
        if (isBlank(username, account, password, password2)) {
            alert('輸入不可為空白')
        } else if (password !== password2) {
            alert('密碼不一致')
            setPassword('')
            setPassword2('')
        } else {
            fetch(API_REGISTER, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    account,
                    password
                })
            })
            .then ( res => res.json())
            .then ( (data) => {
                if (!data.success) {
                    alert(data.message)
                    setAccount('')
                    setPassword('')
                    setPassword2('')
                } else {
                    alert(data.message)
                    // 註冊成功 跳轉
                }
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
            <input type="submit" value="註冊"/>
            <Link to='/login' className='link'>登入</Link>
        </form>
    </div>)
}