import React from 'react'
import { SnackbarProvider } from 'notistack';
import SignUp from '../../Components/SignUp';

export default function SignupPage() {
    return (
        <>
            <SnackbarProvider>
                <SignUp />
            </SnackbarProvider>
        </>
    )
}
