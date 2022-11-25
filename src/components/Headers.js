import React from 'react'
import { Link } from 'react-router-dom'

export default function Headers() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/topic/overview'>Topic</Link>
                </li>
                <li>
                    <Link to='/others'>Others</Link>
                </li>
            </ul>
        </nav>
    )
}