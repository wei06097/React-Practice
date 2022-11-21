import { useState } from 'react'

const Edit = function ({ add, submittingStatus }) {
    
    const [name, setName] = useState('')
    const changeName = (e) => setName(e.target.value)

    const [author, setAuthor] = useState('')
    const changeAuthor = (e) => setAuthor(e.target.value)

    const [URL, setURL] = useState('')
    const changeURL = (e) => setURL(e.target.value)
    
    function addItem() {
        submittingStatus.current = true;
        const id = Date.now()
        add((prevData) => {
            return [{id, name, author, URL}, ...prevData]
        })
        setName('');
        setAuthor('');
        setURL('');
    }

    return <div className="edit">
        <h1>歌曲資訊</h1>
        <p>歌名:</p>
        <input value={name} onChange={changeName} />
        <p>歌手:</p>
        <input value={author} onChange={changeAuthor} />
        <p>連結:</p>
        <input value={URL} onChange={changeURL} />
        <button className="add" onClick={addItem}>新增</button>
    </div>
}

export default Edit