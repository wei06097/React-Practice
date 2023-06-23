import { useSelector } from "react-redux/es/hooks/useSelector"
import style from "./Profile.module.css"

import Login from "./Login"
import Notlogin from "./Notlogin"
import Counter from "./Counter"

export default function Profile() {
    const user = useSelector(state => state.user)
    return <div className={style.body}>
        {user.loading && <div className = "loading-ring" />}
        {user.profile.login ? <Login /> : <Notlogin />}
        <Counter />
    </div>
}
