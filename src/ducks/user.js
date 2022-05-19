"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = { name: '', age: 5, email: '' };
const userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: { value: initialState },
    reducers: {
        login(state, action) {
            state.value = action.payload;
        },
        logout(state) {
            state.value = { name: '', age: 0, email: '' };
        },
    },
});
exports.login = userSlice.actions.login;
exports.logout = userSlice.actions.logout;
exports.default = userSlice.reducer;
