import { useState, useEffect, useRef } from 'react'
import Edit from './components/Edit'
import List from './components/List'
import { API } from '../../global/constant'
import './index.css'

async function fetchData() {
    try {
        const res = await fetch(API)
        const data = await res.json()
        return Promise.resolve(data.data)
    } catch {
        return Promise.reject([])
    }
}

async function putData(data) {
    try {
        await fetch(API, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({data})
        })
        return true
    } catch {
        return false
    }
}

const Home = function () {

    const submittingStatus = useRef(false)
    const [data, setData] = useState([])

    useEffect( () => {
        fetchData().then( data => setData(data))
    }, [])

    useEffect( () => {
        if (!submittingStatus.current) return
        putData(data)
        submittingStatus.current = false
    }, [data])

    return <div className='app'>
        <Edit add={setData} submittingStatus={submittingStatus} />
        <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
    </div>
}

export default Home