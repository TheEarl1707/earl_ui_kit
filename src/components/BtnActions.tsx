import * as React from 'react';
import { router } from '@inertiajs/react';
import { Button, Tooltip } from '@mui/material';

interface Props {
    url?: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    icon?: any;
    color?: 'info' | 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    hover_title?: string;
    onClickAction?: any;
}

export default function BtnActions({ url='', method='get', icon, color='info', hover_title, onClickAction=false }: Props) {
    return (
        <>
            <Tooltip title={hover_title}>
                <Button
                    className='mt-2'
                    variant='contained'
                    onClick = {
                        onClickAction
                            ? onClickAction //execute the onClickAction function
                            : () => {
                                if (url === '') {
                                    router.visit(url, {
                                        method: method
                                    });
                                }
                            }
                    }
                    color={color}
                >
                    { icon }
                </Button>

            </Tooltip>
        </>
    );
}
