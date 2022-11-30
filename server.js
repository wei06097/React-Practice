/* ======================================== */
const PORT = 5000
const API_USERS = "http://localhost:4000/users"
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())
app.use(express.json())

/* ======================================== */
function isBlank(...list) {
    for (let i=0; i<list.length; i++) {
        if (list[i] === '') return true
    }
    return false
} 

async function loginRequest(account, password) {
    const res = await fetch(API_USERS)
    const array = await res.json()
    for (let i=0; i<array.length; i++) {
        let user = array[i]
        if (user.account === account) {
            if (user.password === password) return Promise.resolve({
                success: true,
                message: '登入成功'
            })
            return Promise.resolve({
                success: false,
                message: '密碼錯誤'
            })
        }
    }
    return Promise.resolve({
        success: false,
        message: '帳號未註冊'
    })
}

async function registerRequest(username, account, password) {
    const res = await fetch(API_USERS)
    const array = await res.json()
    for (let i=0; i<array.length; i++) {
        let user = array[i]
        if (user.account === account) return Promise.resolve({
            success: false,
            message: '帳號已被註冊'
        })
    }
    await fetch(API_USERS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            account,
            password,
            username
        })
    })
    return Promise.resolve({
        success: true,
        message: '註冊成功'
    })
}

/* ======================================== */
app.post('/login', (req, res) => {
    const account = req.body.account
    const password = req.body.password
    if (isBlank(account, password)) {
        res.json({
            success: false,
            message: "格式不合法"
        })
    } else {
        loginRequest(account, password)
        .then( (status) => {
            res.json(status)
        })
    }
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const account = req.body.account
    const password = req.body.password
    if (isBlank(username, account, password)) {
        res.json({
            success: false,
            message: "格式不合法"
        })
    } else {
        registerRequest(username, account, password)
        .then( (status) => {
            res.json(status)
        })
    }
})

/* ======================================== */
app.listen(PORT, () => {
    console.log('start')
})