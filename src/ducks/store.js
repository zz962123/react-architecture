import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import themeReducer from './theme'
import dummyReducer from './api/dummyApi/dummyApi'

export default configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        dummy: dummyReducer
    },
})