import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { loginUser } from "../store/userSlice"

export default function Notlogin() {
    const user = useSelector(state => state.user)
    const {loading} = user
    const nameRef = useRef()
    const passRef = useRef()
    const dispatch = useDispatch()
    function loginHandler(e) {
        e.preventDefault()
        const payload = {
            username : nameRef.current.value,
            password : passRef.current.value,
        }
        dispatch(loginUser(payload))
    }

    return <form onSubmit={loginHandler}>
        <input type="text" placeholder="username (123)" ref={nameRef} />
        <br />
        <input type="password" placeholder="password (456)" autoComplete="true" ref={passRef} />
        <br />
        <input type="submit" value="login" disabled={loading} />
    </form>
}
