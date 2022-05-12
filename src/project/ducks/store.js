import { configureStore } from '@reduxjs/toolkit'
import loginServiceReducer from './services/loginSerivce/loginSerivceSlice'

export default configureStore({
    reducer: {
        loginService : loginServiceReducer
    },
})