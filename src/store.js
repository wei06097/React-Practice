import thunk from 'redux-thunk'
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import storageSession from "redux-persist/lib/storage/session"

import userSlice from "./store/userSlice"
import counterSlice from "./store/counterSlice"

/* ======================================== */
const userPersistConfig = {
    key : "user",
    storage : storage
}
const counterPersistConfig = {
    key : "counter",
    storage : storageSession
}

const reducer = combineReducers({
    user : persistReducer(userPersistConfig, userSlice),
    counter : persistReducer(counterPersistConfig, counterSlice)
})
const store = configureStore({
    reducer : reducer,
    middleware : [thunk]
})

export const persistor = persistStore(store)
export default store
