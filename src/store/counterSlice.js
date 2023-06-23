import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    number : 0
}
const counterSlice = createSlice({
    name : "counter",
    initialState : initialState,
    reducers : {
        add : (state, action) => {
            state.number++
        },
        minus : (state, action) => {
            state.number--
        }
    }
})

export default counterSlice.reducer
export const {add, minus}  = counterSlice.actions
