import React from 'react';
import Button from '../../atoms/Button/Button';
import TextField from '../../atoms/TextField/TextField'
import Login from '../../blocks/Login';
import Profile from '../../blocks/Profile';
import ChangeColor from '../../blocks/ChangeColor';

export default function Home() {
    return (
        <div className="App">
            <Profile/>
            <Login/>
            <ChangeColor/>
        </div>
    );
}