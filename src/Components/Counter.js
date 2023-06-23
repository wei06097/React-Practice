import { useSelector, useDispatch } from "react-redux"
import { add, minus } from "../store/counterSlice"
export default function Counter() {
    const dispatch = useDispatch()
    const {number} = useSelector(state => state.counter)
    return <div>
        <button onClick={() => {dispatch(minus())}}>-</button>
        <span>{number}</span>
        <button onClick={() => {dispatch(add())}}>+</button>
    </div>
}
