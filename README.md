# 測試 React + Redux-Toolkit
- 開啟前端 `npm start`
- 開啟後端 `node server.js`
- [文章來源](https://ithelp.ithome.com.tw/articles/10275089)

# configureStore
- 功用和 createStore 一樣可以建立 Store，但還可以結合 reducers、middleware。

    ```JavaScript
    import { configureStore } from "@reduxjs/toolkit"
    import userSlice from "./store/userSlice"

    const store = configureStore({
        reducer : {
            user : userSlice
        }
    })
    export default store
    ```

# createAction
+ 建立 action creator 的函式，放在 createAction() 裡面的參數會自動變成 action type。

    ```JavaScript
    import { createAction } from '@reduxjs/toolkit'

    const increment = createAction('counter/increment')

    let action = increment()
    // { type: 'counter/increment' }

    action = increment(3)
    // returns { type: 'counter/increment', payload: 3 }
    ```

# createReducer
- 撰寫 reducer 的時候可以不用再用 switch case 語法，並且語法底層加入了 immer，因此可以使用會有 side effect 的寫法去變更 state，背後會再幫你轉成 「immutable」的方式。

    ```JavaScript
    import { createAction, createReducer } from '@reduxjs/toolkit'

    const increment = createAction('counter/increment')
    const decrement = createAction('counter/decrement')
    const incrementByAmount = createAction('counter/incrementByAmount')

    const initialState = { value: 0 }

    const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(increment, (state, action) => {
            state.value++
        })
        .addCase(decrement, (state, action) => {
            state.value--
        })
        .addCase(incrementByAmount, (state, action) => {
            state.value += action.payload
        })
    })
    ```

# createSlice
- 將一個 slice 的 name、初始化的 state、reducer、action 統一在一個地方建立，並會產生 action creators 和 action type。

    ```JavaScript
    import { createSlice } from '@reduxjs/toolkit'

    const initialState = { value: 0 }

    const counterSlice = createSlice({
        name: 'counter',
        initialState,
        reducers: {
            increment(state) {
                state.value++
            },
            decrement(state) {
                state.value--
            },
            incrementByAmount(state, action) {
                state.value += action.payload
            },
        },
    })

    export const { increment, decrement, incrementByAmount } = counterSlice.actions
    export default counterSlice.reducer
    ```

# createAsyncThunk
- 用來處理非同步，會接受一個 action type 和一個回傳 promise 的 callback function，最後回傳一個 thunk action creator。

    ```JavaScript
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import { userAPI } from './userAPI'

    // First, create the thunk
    const fetchUserById = createAsyncThunk(
        'users/fetchByIdStatus',
        async (userId, thunkAPI) => {
            const response = await userAPI.fetchById(userId)
            return response.data
        }
    )

    // Then, handle actions in your reducers:
    const usersSlice = createSlice({
        name: 'users',
        initialState: { entities: [], loading: 'idle' },
        reducers: {
            // standard reducer logic, with auto-generated action types per reducer
        },
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            builder.addCase(fetchUserById.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
            })
        },
    })
    ```

# useSelector & useDispatch
- useSelector: 取得 store 所儲存的 state。
- useDispatch: 調用 reducer 來分發一個 action 以更新狀態。

    ```JavaScript
    import { useDispatch } from "react-redux"
    import { useSelector } from "react-redux/es/hooks/useSelector"
    import { loginUser } from "../store/userSlice"

    export default function Notlogin() {
        const user = useSelector(state => state.user)
        const dispatch = useDispatch()

        function loginHandler() {
            const username = "123"
            const password = "465"
            dispatch(loginUser({username, password}))
        }

        return <button onClick={loginHandler} />
    }
    ```