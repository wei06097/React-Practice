import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Headers from './components/Headers'
import NotFound from './components/NotFound'
import Home from './pages/Home/Home'
import Others from './pages/Others/Others'
import Topic from './pages/Topic/Topic'

export default function AppRouter() {
    return (
        <>
            <Router><Routes>
                <Route index element={ <><Headers/><Home/></> } />
                <Route path='others' element={ <><Headers/><Others/></> } />
                <Route path='/topic/:type' element={ <Topic/> } />
                <Route path='*' element={ <NotFound/> } />
            </Routes></Router>
        </>
    )
}