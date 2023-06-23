import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const loginUser = createAsyncThunk(
    'user/loginUser', async (payload, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const initialState = {
    profile : {
        username : "",
        login : false,
    },
    loading: false,
}
const userSlice = createSlice({
    name : "user",
    initialState : initialState,
    reducers : {
        setLogout(state) {
            state.profile = {...initialState.profile}
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const {isSuccess, username} = action.payload
                if (isSuccess) {
                    state.profile = {
                        username,
                        login : true
                    }
                } else {
                    state.profile = {...initialState.profile}
                    alert("登入失敗")
                }
                state.loading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                alert(action.payload)
                state.loading = false
            })
    }
})

export default userSlice.reducer
export const { setLogout } = userSlice.actions
