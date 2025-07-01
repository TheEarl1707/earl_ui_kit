import * as React from 'react';
import Swal from 'sweetalert2'
import withReactContent, { ReactSweetAlert } from 'sweetalert2-react-content'
import axios from 'axios';
import { route } from 'ziggy-js';

import LockOpenIcon from '@mui/icons-material/LockOpen';

import BtnActions from './BtnActions';

interface Props {
    target_user_id: number | string;
    resource: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setSnackbar: React.Dispatch<React.SetStateAction<any>>;
}

export default function BtnResetPassword({ target_user_id, resource, setLoading, setSnackbar }: Props): React.ReactNode {
    const SwalResetPassword = (): void => {
        const MySwal: ReactSweetAlert = withReactContent(Swal)

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

                let password: string = result.value;
                let data: Record<string, any> = {
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
                        setSnackbar({
                            open: true,
                            message: error.response.data.message,
                            severity: 'error'
                        });
                    });

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