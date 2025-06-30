import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button, Grid, Tooltip } from '@mui/material';

export default function BtnActions({ url='', method='get', icon, color='info', hover_title, onClickAction=false, data=null, setLoading, setSnackbarOpen, setSnackbar }) {
    // const [loading, setLoading] = React.useState(false);

    const onClick = () => {
        // setLoading(true);

        // (onClickAction)
        //     ? onClickAction()
        //     : () => {
        //         router.visit(url, {
        //             method: method
        //         })
        //      }

        if (onClickAction) {
            onClickAction();
        } else {
            setLoading(true);

            router.visit(url, {
                method: method,
                onSuccess: (response) => {
                    // console.log(response)
                    setSnackbar({
                        open: true,
                        message: response.data.message,
                        severity: 'success'
                    });
                },
                onError: (error) => {
                    // console.log(error)
                    setSnackbar({
                        open: true,
                        message: error.response.data.message,
                        severity: 'error'
                    });
                }
            });

            setLoading(false);
        }

        //! Use form method spoofing if you wanna upload files via PUT or PATCH

        // setLoading(false);
    }

    return (
        <>
            <Tooltip title={hover_title}>
                <Button
                    className='mt-2'
                    variant='contained'
                    // onClick={ onClick }
                    onClick = {
                        onClickAction
                            ? onClickAction
                            : () => {
                                router.visit(url, {
                                    method: method
                                })
                             }
                    }
                    color={color}
                    // loading={loading}
                    data={data}
                >
                    { icon }
                </Button>

            </Tooltip>
        </>

    );
}
