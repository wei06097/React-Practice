import React from 'react'
import './Login.css'

export default function Login() {
    return <>
        <form action="" method='post' className='login'>
            <h1>登入頁面</h1>
            <input type="text" placeholder='帳號'/>
            <input type="password" placeholder='密碼'/>
            <input type="submit" value="登入"/>
        </form>
    </>
}