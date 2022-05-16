/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';
import styled from '@emotion/styled'

export default function MuiButton() {
    
    const Basic = ({className}) => { return <Button className={className}>test</Button> }
    const TestButton = styled(Basic)`
        color: red;
    `

    
    return ( 
        <div>
        {/* <Button 
            css = {css`
                color: red;
            `}
        >
            test
        </Button> */}
        <TestButton></TestButton>
        </div>
    );
}