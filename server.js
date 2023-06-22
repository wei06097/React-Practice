const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
    res.send("Nice")
})
app.post('/login', function (req, res) {
    const {username, password} = req.body
    const isCorrect = (username === '123' && password === '456')
    if (isCorrect) {
        res.json({
            isSuccess : true,
            username : username
        })
    } else {
        res.json({
            isSuccess : false,
            username : ""
        })
    }
})

const HOST = "localhost"
const PORT = "4000"
app.listen(PORT, HOST, () => {
    console.log(`Network : http://${HOST}:${PORT}`)
})
