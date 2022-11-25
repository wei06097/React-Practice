import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Topic() {
    return (
        <>
            <div><Link to='education'>教育(圖形化)</Link></div>
            <div><Link to='entertainment'>娛樂(圖形化)</Link></div>
            <br />
            <div><Outlet /></div>
        </>
    )
}