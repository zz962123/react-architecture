import { createSlice } from '@reduxjs/toolkit';

// reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.
// name은 리듀서 이름 뭘로 할지 정하는거고 
// initialState는 들어갈 데이터의 초기값 잡아주는 용도.
// reducers에서 이제 상태가 변하면 어떻게 실행될지 정하는 부분이다.

const initialState = { name: '', age: 0, email: '' }

const userSlice = createSlice({
    name: 'user',   
    initialState: { value : initialState },
    reducers: {        
        login(state, action) {
            state.value = action.payload
        },
        logout(state) {
            state.value = initialState
        },
    },
})

export const { login } = userSlice.actions
export const { logout } = userSlice.actions
export default userSlice.reducer