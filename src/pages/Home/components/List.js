import Item from './Item'

const List = function ({ listData, deleteData, submittingStatus }) {

    return <div className='list'> {
        listData.map( (item) => {
            const {id, name, author, URL} = item
            return <Item
                key = {id}
                id = {id}
                name={name}
                author={author}
                URL={URL}
                deleteData={deleteData}
                submittingStatus={submittingStatus}
            />
        })
    } </div>
}

export default List