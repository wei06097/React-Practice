import './Login.css'
import React, {useState} from 'react'
import {API_LOGIN} from '../constant'

export default function Login() {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const handleAccount = (e) => setAccount(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const submitForm = (e) => {
        e.preventDefault()
        if (account === '' || password === '') {
            alert('帳號密碼不可為空白')
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
                alert(data.message)
                if (! data.success) {
                    setPassword('')
                } else {
                    // 登入成功 跳轉
                }
            })
        }
    }

    return (<>
        <form onSubmit={submitForm} className='login'>
            <h1>登入頁面</h1>
            <input type="text" placeholder='帳號' onChange={handleAccount} value={account} />
            <input type="password" placeholder='密碼' onChange={handlePassword} value={password} autoComplete="on" />
            <input type="submit" value="登入"/>
            {/* <div>註冊帳號</div> */}
        </form>
    </>)
}