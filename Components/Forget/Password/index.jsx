import { TextField } from '@mui/material'
import React from 'react'

export default function Password() {
    return (
        <TextField 
            required
            id="Password"
            label="Password"
            name="Password"
            autoComplete="Password"
            sx={{
                mt: 3,
                gridRow: '1',
                gridColumn: 'span 10'
            }}/>
    )
}

