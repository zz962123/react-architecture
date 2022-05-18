"use strict";
exports.__esModule = true;
exports.logout = exports.login = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = { name: '', age: 0, email: '' };
var userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: { value: initialState },
    reducers: {
        login: function (state, action) {
            state.value = action.payload;
        },
        logout: function (state) {
            state.value = { name: '', age: 0, email: '' };
        }
    }
});
exports.login = userSlice.actions.login;
exports.logout = userSlice.actions.logout;
exports["default"] = userSlice.reducer;
