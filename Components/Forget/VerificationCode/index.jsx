import { TextField } from '@mui/material'
import React from 'react'

export default function VerificationCode() {
    return (
        <TextField 
            required
            id="verificationcode"
            label="Verification Code"
            name="verificationcode"
            autoComplete="verificationcode"
            sx={{
                mt: 3,
                gridRow: '1',
                gridColumn: 'span 10'
            }}/>
    )
}
