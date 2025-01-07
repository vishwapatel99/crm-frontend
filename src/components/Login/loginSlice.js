import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isAuth: false,
    error:'',
}


const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isAuth= true;
            state.error = "";
        },
        loginFail: (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
        },
        logoutSuccess: (state) => {
            state.isAuth = false;
        },
    }
})

const {reducer, actions} = loginSlice;

export const { loginPending, loginSuccess, loginFail, logoutSuccess } = actions;

export default reducer;