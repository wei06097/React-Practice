import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from './App'
import Home from './pages/Home/Home'
import Others from './pages/Others/Others'
import Topic from './pages/Topic/Topic'
import Education from './pages/Topic/components/Education'
import Entertainment from './pages/Topic/components/Entertainment'

export default function AppRouter() {
    return (
        <>
            <Router><Routes>
                <Route path='/' exact element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='topic' element={<Topic />}>
                        <Route path='education' element={<Education />} />
                        <Route path='entertainment' element={<Entertainment />} />
                    </Route>
                    <Route path='others' element={<Others />} />
                </Route>
                <Route path='*' element={<h1>404 Not Found</h1>} />
            </Routes></Router>
        </>
    )
}