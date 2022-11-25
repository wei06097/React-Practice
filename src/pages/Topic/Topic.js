import React from 'react'
import { Link, useParams } from 'react-router-dom'

import Headers from '../../components/Headers'
import NotFound from '../../components/NotFound'
import Education from './components/Education'
import Entertainment from './components/Entertainment'

export default function Topic() {
    const type = useParams().type
    switch (type) {
        case 'overview':
            return <>
                <Headers />
                <Linkers />
            </>
        case 'education':
            return <>
                <Headers />
                <Linkers />
                <br/>
                <Education />
            </>
        case 'entertainment':
            return <>
                <Headers />
                <Linkers />
                <br/>
                <Entertainment />
            </>
        default:
            return <NotFound />
    }
}

function Linkers() {
    return (
        <>
            <div><Link to='/topic/education'>教育(圖形化)</Link></div>
            <div><Link to='/topic/entertainment'>娛樂(圖形化)</Link></div>
        </>
    )
}