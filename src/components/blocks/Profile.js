import React from 'react'
import { useSelector } from 'react-redux'
// useSelector를 이용하면 우리가 만든 리듀서에 접근할 수 있다.

function Profile() {
    const user = useSelector((state) => state.user.value)
    const themeColor = useSelector((state) => state.theme.value);

    return (
        <div style={{ color:themeColor }}>
            <h1>Profile Page</h1>
            <p> Name : {user.name}</p>
            <p> Age : {user.age}</p>
            <p> Email : {user.email}</p>
        </div>
    );
}

export default Profile