import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import * as cookie from './pages/cookie'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import Homepage from './pages/homepage/Homepage'

const NotFound = () => <h1>404 Not Found</h1>
const Home = () => {
    cookie.checkUser()
    .then( () => window.location.href = '/homepage')
    .catch( () => window.location.href = '/login')
    return <></>
}

export default function App() {
    return (<>
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    </>)
}