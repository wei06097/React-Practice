/* ======================================== */
const PORT = 5000
const API_USERS = "http://localhost:4000/users"
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())
app.use(express.json())

/* ==================== */
const ILLEAGE = {
    success: false,
    message: "格式不合法"
}
const NORESPONSE = {
    success: false,
    message: "伺服器已暫停"
}

/* ======================================== */
function isBlank(...list) {
    for (let i=0; i<list.length; i++) {
        if (list[i] === '') return true
    }
    return false
} 

async function loginRequest(account, password) {
    try {
        const res = await fetch(`${API_USERS}?account=${account}`)
        const users = await res.json()
        const user = users[0]
        if (user) {
            const success = (user.password === password)
            return Promise.resolve({
                success: success,
                message: success? '登入成功': '密碼錯誤'
            })
        } else {
            return Promise.resolve({
                success: false,
                message: '帳號未註冊'
            })
        }
    } catch {
        return Promise.reject()
    }
}

async function registerRequest(username, account, password) {
    try {
        const res = await fetch(`${API_USERS}?account=${account}`)
        const users = await res.json()
        const user = users[0]
        if (user) {
            return Promise.resolve({
                success: false,
                message: '帳號已被註冊'
            })
        } else {
        const res = await fetch(API_USERS, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    account,
                    password,
                    username
                })
            })
            const user = await res.json()
            const success = (user.account === account)
            return Promise.resolve({
                success: success,
                message: success? '註冊成功，請重新登入': '註冊失敗'
            })
        }
    } catch {
        return Promise.reject()
    }
}

/* ======================================== */
app.post('/login', (req, res) => {
    const account = req.body.account
    const password = req.body.password
    if (isBlank(account, password)) res.json(ILLEAGE)
    loginRequest(account, password)
    .then( status => res.json(status) )
    .catch( () => res.json(NORESPONSE) )
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const account = req.body.account
    const password = req.body.password
    if (isBlank(username, account, password)) res.json(ILLEAGE)
    registerRequest(username, account, password)
    .then( status => res.json(status) )
    .catch( () => res.json(NORESPONSE) )
})

/* ======================================== */
app.listen(PORT, () => {
    console.log('start')
})