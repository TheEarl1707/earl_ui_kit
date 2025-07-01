import * as React from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { Button, Stack } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import { route } from 'ziggy-js';

import LockOpenIcon from '@mui/icons-material/LockOpen';

import BtnActions from './BtnActions';

export default function BtnResetPassword({ target_user_id, resource, setLoading, setSnackbar }) {
    const capital_resource = resource.charAt(0).toUpperCase() + resource.slice(1);

    const SwalResetPassword = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure?',
            text: `Enter your password to reset this account\'s password`,
            input: 'password',
			inputAttributes: {
			  	autocapitalize: 'off'
			},
			icon: 'warning',
			// showCancelButton: true,
			showDenyButton: true,
			confirmButtonText: 'Confirm',
			confirmButtonColor: 'Red',
			denyButtonText: 'Cancel',
			denyButtonColor: 'Green',
        }).then((result) => {
            if (result.isConfirmed) {

                let password = result.value;
                let data = {
					target_user_id: target_user_id,
					password: password
                }

                setLoading(true);

                axios.post(route(`${resource}.reset_password`), data)
                    .then((response) => {
                        // console.log(response)
                        setSnackbar({
                            open: true,
                            message: response.data.message,
                            severity: 'success'
                        });
                    })
                    .catch((error) => {
                        // console.log(error);
                        setSnackbar({
                            open: true,
                            message: error.response.data.message,
                            severity: 'error'
                        });s
                    });

                // console.log(data)
                setLoading(false);
            }
        })
    }

    return (
        <BtnActions
            icon={ <LockOpenIcon/> }
            color='success'
            hover_title='Reset Password'
            onClickAction={() => {
                SwalResetPassword()
            }}
        />
    );
}