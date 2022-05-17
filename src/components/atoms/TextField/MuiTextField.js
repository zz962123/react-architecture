import React from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled'

export default function MuiTextField({children, ...props}) {

    const Basic = ({className}) => {
        return <TextField className={className} {...props}>{children}</TextField> 
    }

    let CustomTextField = null;
    CustomTextField = styled(Basic)``;

    if(props.styled !== undefined || props.styled !== null || props.styled !== ""){
        CustomTextField = styled(Basic)`
        `;
    }

    return (
        <>
            <CustomTextField/>
        </>
    );
}