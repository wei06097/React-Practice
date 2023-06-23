import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    number : 0
}
const counterSlice = createSlice({
    name : "counter",
    initialState : initialState,
    reducers : {
        add : (state) => {
            state.number++
        },
        minus : (state) => {
            state.number--
        }
    }
})

export default counterSlice.reducer
export const {add, minus}  = counterSlice.actions
