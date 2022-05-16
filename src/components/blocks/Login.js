import React from 'react'
import MuiButton from '../atoms/Button/MuiButton'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../ducks/user';

function Login() {
    const dispatch = useDispatch()
    return (
        <div>
            <MuiButton text = "Login" onClick={() => {dispatch(login({name: "내 이름", age: 20, email: "email@gmail.com"}))}}>
                Login
            </MuiButton>

            <MuiButton text = "Logout" onClick={() => {dispatch(logout())}}>
                Logout
            </MuiButton>
        </div>
    );
}

export default Login