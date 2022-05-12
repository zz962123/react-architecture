import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDummyApi } from '../../ducks/api/dummyApi/dummyApi'
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
            <p> Name : {user.name}</p>
            <p> Age : {user.age}</p>
            <p> Email : {user.email}</p>
            <p> dummy : {dummyApi}</p>
            {/* <p> dummy : {console.log(dummyApi.data[0].id)}</p> */}
        </div>
    );
}

export default Profile