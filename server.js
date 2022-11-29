/* ======================================== */
const PORT = 5000
const API_DB = "http://localhost:4000/posts"
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())
app.use(express.json())

/* ======================================== */
async function loginRequest(account, password) {
    const res = await fetch(API_DB)
    const array = await res.json()
    for (let i=0; i<array.length; i++) {
        let user = array[i]
        if (user.account == account) {
            if (user.password == password) return Promise.resolve('登入成功')
            return Promise.reject('密碼錯誤')
        }
    }
    return Promise.reject('帳號未註冊')
}

/* ======================================== */
app.post('/login', function (req, res) {
    const account = req.body.account
    const password = req.body.password
    if (account === '' || password === '') {
        res.json({
            success: false,
            message: "格式不合法"
        })
    } else {
        loginRequest(account, password)
        .then( (message) => {
            res.json({
                success: true,
                message: message
            })
        })
        .catch( (message) => {
            res.json({
                success: false,
                message: message
            })
        })
    }
})

/* ======================================== */
app.listen(PORT, () => {
    console.log('start')
})