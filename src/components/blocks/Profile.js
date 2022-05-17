import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDummyApi } from '../../ducks/api/dummyApi/dummyApi'
import { TextField } from '@mui/material'
import MuiTextField from '../atoms/TextField/MuiTextField'
// useSelector를 이용하면 우리가 만든 리듀서에 접근할 수 있다.

function Profile() {
    const user = useSelector((state) => state.user.value)
    const themeColor = useSelector((state) => state.theme.value);
    const dummyApi = useSelector((state) => state.dummy.status);
    // const api = useSelector((state) => state.dummyApi.value)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDummyApi());
    }, []);
    // }, [dispatch]);

    return (
        <div style={{ color:themeColor }}>
            <h1>Profile Page</h1>
            <TextField
                disabled
                size='small'
                id="outlined-textarea"
                label="Name"
                value={user.name}
            /> <br/><br/>
            <MuiTextField  
                disabled
                size='small'
                id="outlined-textarea"
                label="Age"
                value={user.age}
            /> <br/><br/>
            <MuiTextField  
                disabled
                size='small'
                id="outlined-textarea"
                label="Email"
                value={user.email}
            /> <br/><br/>
            <MuiTextField  
                disabled
                size='small'
                id="outlined-textarea"
                label="dummy"
                value={dummyApi}
            /> <br/><br/>
            {/* <p> dummy : {console.log(dummyApi.data[0].id)}</p> */}
        </div>
    );
}

export default Profile