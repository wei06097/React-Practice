import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
    return (
        <>
            <Headers />
            <Outlet />
        </>
    )
}

const Headers = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/topic'>Topic</Link>
                </li>
                <li>
                    <Link to='/others'>Others</Link>
                </li>
            </ul>
        </nav>
    )
}