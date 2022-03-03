import React from 'react'
import { SnackbarProvider } from 'notistack';
import Forget from '../../Components/Forget';

export default function ForgetPage() {
    return (
        <SnackbarProvider>
            <Forget/>
        </SnackbarProvider>
    )
}
