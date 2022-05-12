import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

export const postLoginSerivce = createAsyncThunk("POST/LOGIN", async (param) => {
    const response = await axios.post("/api/v1/user/login", param);
    return response.data;
});

export const loginServiceSlice = createSlice({
    name: "loginService",
    initialState: { status: "", value: [], result: "FAIL" },
    reducers: {},
    extraReducers: {
        [postLoginSerivce.pending]: (state, action) => {
            state.value = ""
            state.status = 'loading'
        },
        [postLoginSerivce.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.result = payload.result
            state.value = [payload]
            state.status = 'success'
        },
        [postLoginSerivce.rejected]: (state, action) => {
            state.value = ""
            state.status = 'failed'
        },
    },
});

export default loginServiceSlice.reducer;