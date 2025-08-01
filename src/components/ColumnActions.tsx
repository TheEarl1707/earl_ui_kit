import * as React from 'react';
import { Stack } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent, { ReactSweetAlert } from 'sweetalert2-react-content'

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import DeleteIcon from '@mui/icons-material/Delete';

import BtnActions from './BtnActions';
import axios, { AxiosResponse } from 'axios';
import { route } from 'ziggy-js';

interface Props {
    user?: {
        role: string;
        id: string | number;
    };
    resource: string;
    row_id: number | string;
    is_approved: boolean | null;
    can_edit?: boolean;
    can_archive?: boolean;
    can_delete?: boolean;
    can_approve_disapprove?: boolean;
    refreshData?: any;
    setLoading?: any;
    setSnackbar?: any;
    custom_btn_1?: React.ReactNode;
}

export default function ColumnActions({ user, resource, row_id, is_approved=null, can_edit=false, can_archive=false, can_delete=false, can_approve_disapprove=false, refreshData, setLoading, setSnackbar, custom_btn_1 }: Props): React.ReactNode {
    const role: string | undefined = user?.role;
    const user_id: string | number | undefined = user?.id;
    // console.log(is_approved)

    // user={ role: '', id: '' }

    const MySwal: ReactSweetAlert = withReactContent(Swal)
    const capitalResource = resource.charAt(0).toUpperCase() + resource.slice(1);
    const wordArchiveDelete: 'archive' | 'delete' = can_archive ? 'archive' : 'delete';
    const capitalWordArchiveDelete: string = wordArchiveDelete.charAt(0).toUpperCase() + wordArchiveDelete.slice(1);

    const SwalApproveUnapprove = (): void => {
        let action_word: string = '';
        let send_route: string = '';

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

                let password: string = result.value;
                let data: Record<string, any> = {
                    submitted_id: row_id,
                    password: password,
                    action: !(is_approved)
                }

                setLoading(true);

                //* SnackbarAlert: Use flash if sent via Inertia, Figure out what to use if sent via axios

                axios.post(send_route, data)
                    .then((response) => {
                        refreshData(row_id);
                        setLoading(false);
                        setSnackbar({
                            open: true,
                            message: response.data.message,
                            severity: 'success'
                        });
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

                // console.log(data)

                // setData(data1);
                // post(`${resource}/archive_unarchive`);
            }
        });
    };

    const SwalArchiveDelete = (): void => {
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

                let password: string = result.value;
                let data: Record<string, any> = {
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

                // console.log(data)

                // setData(data1);
                // post(`${resource}/archive_unarchive`);
            }
        });
    }

    const SwalArchiveDeleteNoAccount = (): void => {
        MySwal.fire({
            title: `Confirm to ${wordArchiveDelete} this entry`,
            icon: 'warning',
            // showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'Red',
            denyButtonText: 'Cancel',
            denyButtonColor: 'Green',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);

                const request: Promise<AxiosResponse<any>> = (can_delete)
                    ? axios.post(route(`${resource}.destroy`, { id: row_id }))
                    : axios.post(route(`${resource}.archive_unarchive`));

                request
                .then((response) => {
                    refreshData(row_id);
                    setLoading(false);
                    setSnackbar({
                        open: true,
                        message: response.data.message,
                        severity: 'success'
                    });
                })
                .catch((error) => {
                    setLoading(false);
                    setSnackbar({
                        open: true,
                        message: error.response.data.message,
                        severity: 'error'
                    });
                });
            }
        });
    }

    const btnEdit: React.ReactNode | null =
        (can_edit && !(is_approved))
            ?  <BtnActions
                url={`${resource}/edit/${row_id}`}
                method='get'
                icon={<EditIcon />}
                color='warning'
                hover_title='Edit Info'
             />
            : null;

    const btnShow: React.ReactNode | null =
        (is_approved)
            ? <BtnActions
                url={`${resource}/show/${row_id}`}
                method='get'
                icon={<InfoIcon />}
                color='info'
                hover_title='Show Info'
             />
            : null;

    const btnApprove: React.ReactNode | null =
        (can_approve_disapprove && is_approved === false)
            ? <BtnActions
                icon={<GavelIcon />}
                color='success'
                hover_title='Approve'
                onClickAction={() => {
                    SwalApproveUnapprove();
                }}
             />
            : null;

    const btnUnapprove: React.ReactNode | null =
        (can_approve_disapprove && is_approved === true)
            ? <BtnActions
                icon={<GavelIcon />}
                color='error'
                hover_title='Unapprove'
                onClickAction={() => {
                    SwalApproveUnapprove();
                }}
                />
            : null;


    const btnArchiveDelete: React.ReactNode | null =
        ((can_archive || can_delete) && (is_approved === false) && (user_id !== null))
            ? <BtnActions
                icon={<DeleteIcon />}
                color='error'
                hover_title={capitalWordArchiveDelete}
                onClickAction={() => {
                    // SwalArchiveDelete({ row_id, is_approved, resource });
                    SwalArchiveDelete();
                }}
                />
            : null;

    const btnArchiveDeleteNoAccount: React.ReactNode | null =
        ((can_archive || can_delete) && (is_approved === false) && user_id)
            ? <BtnActions
                icon={<DeleteIcon />}
                color='error'
                hover_title={capitalWordArchiveDelete}
                onClickAction={() => {
                    SwalArchiveDeleteNoAccount();
                }}
                />
            : null;

    return (
        <>
            <Stack direction="row" spacing={1} className='mt-1'>
                { btnEdit }
                { btnShow }
                { btnApprove }
                { btnUnapprove }
                { btnArchiveDelete }
                { btnArchiveDeleteNoAccount }
                { custom_btn_1 }
            </Stack>
        </>
    );
}