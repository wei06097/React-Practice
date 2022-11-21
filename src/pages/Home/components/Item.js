const Item = function ({ id, name, author, URL, deleteData, submittingStatus }) {

    function removeItem() {
        submittingStatus.current = true;
        deleteData( (prevData) => {
            return prevData.filter(item => item.id !== id)
        })
    }
    
    return <div className="item">
        <div className="info">
            <div>歌名: {name}</div>
            <div>歌手: {author}</div>
            <a href={URL}>連結</a>
        </div>
        <button className="remove" onClick={removeItem}>刪除</button>
    </div>
}

export default Item