import Profile from "./Components/Profile"
import store from "./store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <Profile />
    </Provider>
  )
}

export default App
