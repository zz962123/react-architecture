import React from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';

export default function MuiButton() {
    return ( 
        <Button 
            css = {css`
                color: #2e8b57;
            `}
        >
            test
        </Button>
    );
}