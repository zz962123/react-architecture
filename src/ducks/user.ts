import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoState {
    name : string
    age : number
    email : string
}

const initialState = { name: '', age: 5, email: '' } as InfoState 

const userSlice = createSlice({
    name: 'user',   
    initialState: { value: initialState },
    reducers: {        
        login(state, action: PayloadAction<InfoState>) {
            state.value = action.payload
        },
        logout(state) {
            state.value = { name: '', age: 0, email: ''  }
        },
    },
})

export const { login } = userSlice.actions
export const { logout } = userSlice.actions
export default userSlice.reducer