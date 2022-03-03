import { SnackbarProvider } from 'notistack';
import React from 'react'
import SignIn from '../../Components/SignIn';

export default function LoginPage() {
    return (
        <>
        <SnackbarProvider>
            <SignIn/>
        </SnackbarProvider>
        </>
    )
}
