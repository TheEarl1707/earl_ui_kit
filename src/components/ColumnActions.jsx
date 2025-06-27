import * as React from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { Button, Stack } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import DeleteIcon from '@mui/icons-material/Delete';

import BtnActions from './BtnActions';
import { showSwal, showSuccessActions, showError } from '../custom-utils';
import axios from 'axios';
import { route } from 'ziggy-js';

export default function ColumnActions({ user, resource, row_id, is_approved, can_edit=false, can_archive=false, can_delete=false, can_approve_disapprove=false, refreshData, setLoading, setSnackbar, customBtn1 }) {
    const role = user.role;
    const user_id = user.id;
    // console.log(is_approved)

    const MySwal = withReactContent(Swal)
    const capitalResource = resource.charAt(0).toUpperCase() + resource.slice(1);
    const wordArchiveDelete = can_archive ? 'archive' : 'delete';
    const capitalWordArchiveDelete = wordArchiveDelete.charAt(0).toUpperCase() + wordArchiveDelete.slice(1);

    const SwalApproveUnapprove = () => {
        let action_word = '';
        let send_route = '';

        if (resource == 'accounts') {
            action_word = is_approved ? 'deactivate' : 'activate';
            send_route = route(`${resource}.activate_deactivate`);
        } else {
            action_word = is_approved ? 'unapprove' : 'approve'
            send_route = route(`${resource}.archive_unarchive`)
        }

        // let action_word = is_approved ? 'unapprove' : 'approve'

        MySwal.fire({
            title: `Enter your password to ${action_word} this entry`,
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
                //shows loading sweetalert
                // showSwal();

                let password = result.value;
                let data = {
                    submitted_id: row_id,
                    password: password,
                    action: !(is_approved)
                }

                setLoading(true);

                //* SnackbarAlert: Use flash if sent via Inertia, Figure out what to use if sent via axios

                axios.post(send_route, data)
                    .then((response) => {
                        console.log(response)
                        refreshData(row_id);
                        setLoading(false);
                        setSnackbar({
                            open: true,
                            message: response.data.message,
                            severity: 'success'
                        });
                        // showSuccessActions(`${capitalResource} updated`, response.data.message)
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        setSnackbar({
                            open: true,
                            message: error.response.data.message,
                            severity: 'error'
                        });
                    });

                console.log(data)

                // setData(data1);
                // post(`${resource}/archive_unarchive`);
            }
        });
    };

    const SwalArchiveDelete = () => {
        MySwal.fire({
            title: `Enter your password to ${wordArchiveDelete} this entry`,
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
                //shows loading sweetalert
                // showSwal();

                let password = result.value;
                let data = {
                    submitted_id: row_id,
                    password: password,
                }

                setLoading(true);

                axios.post(route(`${resource}.destroy`), data)
                    .then((response) => {
                        // console.log(response, response.data, response.data.message)
                        refreshData(row_id);
                        setLoading(false);
                        setSnackbar({
                            open: true,
                            message: response.data.message,
                            severity: 'success'
                        });
                        // showSuccessActions(`${capitalResource} updated`, response.data.message)
                    })
                    .catch((error) => {
                        // console.log(error);
                        setLoading(false);
                        setSnackbar({
                            open: true,
                            message: error.response.data.message,
                            severity: 'error'
                        });
                    });

                console.log(data)

                // setData(data1);
                // post(`${resource}/archive_unarchive`);
            }
        });
    }

    const btnEdit =
        (can_edit && !(is_approved))
            ?  <BtnActions
                url={`${resource}/edit/${row_id}`}
                method='get'
                icon={<EditIcon />}
                color='warning'
                hover_title='Edit Info'
                setSnackbar={setSnackbar}
             />
            : null;

    const btnShow =
        (is_approved)
            ? <BtnActions
                url={`${resource}/show/${row_id}`}
                method='get'
                icon={<InfoIcon />}
                color='info'
                hover_title='Show Info'
                setSnackbar={setSnackbar}
             />
            : null;

    const btnApprove =
        (can_approve_disapprove && !(is_approved))
            ? <BtnActions
                icon={<GavelIcon />}
                color='success'
                hover_title='Approve'
                setSnackbar={setSnackbar}
                onClickAction={() => {
                    SwalApproveUnapprove({ row_id, is_approved, resource });
                }}
             />
            : null;

    const btnUnapprove =
        (can_approve_disapprove && is_approved)
            ? <BtnActions
                icon={<GavelIcon />}
                color='error'
                hover_title='Unapprove'
                setSnackbar={setSnackbar}
                onClickAction={() => {
                    SwalApproveUnapprove({ row_id, is_approved, resource });
                    // SwalApproveUnapprove({ row_id, is_approved, resource })
                    // SwalApproveUnapprove(resource, row_id, is_approved)
                }}
                />
            : null;


    const btnArchiveDelete =
        ((can_archive || can_delete) && !(is_approved))
            ? <BtnActions
                icon={<DeleteIcon />}
                color='error'
                hover_title={capitalWordArchiveDelete}
                setSnackbar={setSnackbar}
                onClickAction={() => {
                    // SwalArchiveDelete({ row_id, is_approved, resource });
                    SwalArchiveDelete();
                }}
                />
            : null;

    /////TODO: Do remember that for approve/unapprove, we use swal to display message and confirm to user about their action. No need to reload after that, but a refresh should be done.

    return (
        <>
            <Stack direction="row" spacing={1}>
                { btnEdit }
                { btnShow }
                { btnApprove }
                { btnUnapprove }
                { btnArchiveDelete }
                { customBtn1 }
            </Stack>
        </>
    );
}