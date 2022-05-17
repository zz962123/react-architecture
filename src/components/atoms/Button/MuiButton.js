// /* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
// /** @jsxImportSource @emotion/react */

// import { css } from '@emotion/react';
//  <Button 
//             css = {css`
//                 color: red;
//             `}
//         >
//             test
//         </Button>

import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled'
import muiButtonStyle from './muiButtonStyle';

export default function MuiButton({children, ...props}) {

    console.log("children : ", children);
    console.log("props : ", props.styled);

    const BasicButton = ({className}) => {
        return <Button className={className} {...props}>{children}</Button> 
    }

    let CustomButton = null;
    CustomButton = styled(BasicButton)``;

    if(props.styled !== undefined && props.styled !== null && props.styled !== ""){
        CustomButton = styled(BasicButton)`
            ${muiButtonStyle(props.styled)}
        `;
    }
    
    return (
        <>
            <CustomButton></CustomButton>
        </>
    );
}