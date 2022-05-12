import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

export const getDummyApi = createAsyncThunk("GET/EMPLOYEES", async () => {
    const response = await axios.get("https://dummy.restapiexample.com/api/v1/employees");
    return response.data.data;
});

export const dummySlice = createSlice({
    name: "dummyApi",
    initialState: { state: '', value: [] },
    reducers: {},
    extraReducers: {
        [getDummyApi.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getDummyApi.fulfilled]: (state, { payload }) => {
            state.value = payload
            state.status = 'success'
        },
        [getDummyApi.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
});

export default dummySlice.reducer;