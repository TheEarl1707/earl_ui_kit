import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface Props {
    snackbar: any;
    flash: any;
    setSnackbar: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SnackbarAlert({ snackbar, setSnackbar, flash, setLoading }: Props): React.ReactNode {

    const alert_msg: string = (snackbar.severity == 'success')
        ? (snackbar.message) ? snackbar.message : flash?.success
        : (snackbar.message) ? snackbar.message : flash?.error

    const onClose = (): void => {
        setSnackbar({ open: false, message: '', type: '' })
        setLoading(false)
    }

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={onClose}
        >
            <Alert
                severity={snackbar.severity}
                variant='filled'
                onClose={onClose}
            >
                {alert_msg}
            </Alert>
        </Snackbar>
    );
}