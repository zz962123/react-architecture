import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Card, TextField, Typography} from '@mui/material';
import axios from 'axios';
import backgroundImage from './background.jpg'

import { useSelector, useDispatch } from 'react-redux'
import { postLoginSerivce } from '../../../ducks/services/loginSerivce/loginSerivceSlice';


const SignIn = (params) => {
    const [inputs, setInputs] = useState({ 
        id: '', 
        password: '' 
    });
    const {id, password} = inputs;
        

    const isInitialMount = useRef(true);
    const loginService = useSelector((state) => state.loginService.value)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("cjeck")
        if(isInitialMount.current){
            isInitialMount.current = false;
        }else{
            if(loginService.length !== 0){
                // localStorage.setItem('jwtsessiontoken', loginService);
                // onInputsReset();
                console.log(localStorage.getItem('jwtsessiontoken'));
            }else{
                alert('아이디 또는 비밀번호를 확인해주세요.')
            }
        }
    }, [loginService]);
    
    const chkip = async()=> {
        var instance = axios.create();
        delete instance.defaults.headers.common['Authorization'];
        const res = await instance.get('https://geolocation-db.com/json/');
        
        if(res.data.IPv4.substring(10,12) === '84') {
            axios.defaults.baseURL ="http://192.168.220.30:28081";
        } else {
            axios.defaults.baseURL = "http://59.25.178.93:28081";
        }
        
    }

    /* 로그인 체크 */
    async function getCheckSignIn(){
        const param = {
            userId : id,
            password : password
        };
        console.log(dispatch(postLoginSerivce(param)));
    }
    
    const onInputsChang = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    
    const onInputsReset = () => {
        setInputs({
            id : '',
            password : ''
        })
    }
    
    const onkeydownpw =(e)=>{
        if(e.keyCode== 13){
            msgCommunication();
        }
    }
    
    const msgCommunication = async () => {
        getCheckSignIn()
    }

    return(
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            style={{
                backgroundImage : `url(${backgroundImage})`, 
                backgroundSize:'cover'
            }}>
            <Card sx={{ minWidth: 325, maxWidth: 350, minHeight: 250, textAlign: 'center' }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography 
                        variant="h5"
                        sx={{paddingTop: "2vh", paddingBottom: "1vh"}}
                        >
                        물놀이장 모니터링 시스템
                    </Typography>
                    <TextField
                        id="outlined-required"
                        label="아이디"
                        sx={{minWidth: 220}}
                        name = 'id'
                        onChange = {onInputsChang}
                        value={id}
                        //onKeyDown={onkeydownid}
                    />
                    <TextField
                        id="outlined-required"
                        label="패스워드"
                        type={'password'}
                        sx={{minWidth: 220}}
                        name = 'password'
                        onChange = {onInputsChang}
                        value={password}
                        onKeyDown={onkeydownpw}
                    />
                    <Button 
                        variant="contained"
                        size="large"
                        sx={{minWidth: 220, fontWeight:700}}
                        onClick={() => msgCommunication()}
                        >
                        접속하기
                    </Button> 
                    <Box sx={{margin:1}}>
                        <Button>
                            <Typography style={{fontSize:12, color:'#4c83c6'}}><b>회원가입</b></Typography>
                        </Button>
                        <Button>
                            <Typography style={{fontSize:12, color:'#4c83c6'}}><b>돌아가기</b></Typography>
                        </Button>
                        {/* <Button variant="contained" disableElevation onClick={()=>history.push('/signup')} style={{ width:90, height:30 ,border:'0px solid #4c83c6', borderRadius:'4px',backgroundColor:'transparent'}}>
                            <Typography style={{fontSize:12, color:'#4c83c6'}}><b>회원가입</b></Typography>
                        </Button>
                        <Button variant="contained" disableElevation onClick={()=>history.push('/')} style={{ width:110, height:30 ,border:'0px solid #4c83c6', borderRadius:'4px',backgroundColor:'transparent'}}>
                            <Typography style={{fontSize:12, color:'#4c83c6'}}><b>돌아가기</b></Typography>
                        </Button> */}
                    </Box>
                    
                </Box>
            </Card>
        </Box>
    )
}

export default SignIn;