import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"
import { setLogout } from "../store/userSlice"

export default function Login() {
    const user = useSelector(state => state.user)
    const {profile} = user
    const dispatch = useDispatch()
    return <div>
        <div>username : {profile.username}</div>
        <button onClick={() => {dispatch(setLogout())}}>logout</button>
    </div>
}
