import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function SnackbarAlert({ snackbar, setSnackbar, flash, setLoading }) {

    const alert_msg = (snackbar.severity == 'success')
        ? (snackbar.message) ? snackbar.message : flash?.success
        : (snackbar.message) ? snackbar.message : flash?.error

    const onClose = () => {
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