import "./loading-ring.css"

import Profile from "./Components/Profile"
import store, { persistor } from "./store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

function App() {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
        <Profile />
    </PersistGate>
    </Provider>
  )
}

export default App
