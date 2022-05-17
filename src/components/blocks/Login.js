import React, { useState, useEffect, useRef } from 'react'
import MuiButton from '../atoms/Button/MuiButton'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../ducks/user';
import useStyle from '../../hooks/useState/useStyle/useStyle'

function Login() {

    // const [style, setStyle] = useState(null);
    const isInitialMount = useRef(true);
    const user = useSelector((state) => state.user.value)
    const style = useStyle(user.name); 
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(isInitialMount.current){
            isInitialMount.current = false;
        }else{
            // if(user.name === "내 이름"){
            //     setStyle("login");
            // } else if(user.name === ""){
            //     setStyle("logout");
            // }
        }
    }, [user])

    return (
        <div>
            <MuiButton variant="contained" onClick={() => {dispatch(login({name: "내 이름", age: 20, email: "email@gmail.com"}))}}>
                Login
            </MuiButton>

            <MuiButton styled={style} variant="outlined" onClick={() => {dispatch(logout())}}>
                Logout
            </MuiButton>
        </div>
    );
}

export default Login
