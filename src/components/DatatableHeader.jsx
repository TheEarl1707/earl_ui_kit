import * as React from 'react';
import { route } from "ziggy-js";
import { Button, Grid2, Stack } from '@mui/material';
import { Link, router } from '@inertiajs/react'

export default function DatatableHeader({ can_add, addRoute, tableName, btnAddText='Add', getRows }) {

    const btnAdd = () => {
        const onClick = () => {
            router.get(route(addRoute));
        }

        if (can_add) {
            return (
                <Button
                    className='me-2'
                    variant='outlined'
                    onClick={ onClick }
                >{ btnAddText }
                </Button>
            )
        }
    }

    const btnRefresh = () => {
        const onClick = () => {
            getRows();
        }

        return (
            <Button
                variant='outlined'
                onClick={onClick}
            >Refresh
            </Button>
        )
    }

    return (
        <>
            <Grid2 container alignItems="center" justifyContent="space-between" className="py-2">
                <Grid2 size={8}>
                    <h5 className='ms-2 mt-2'>{ tableName }</h5>
                </Grid2>
                <Grid2 size={4} display="flex" justifyContent="flex-end">
                    <Stack direction="row" spacing={1}>
                        { btnRefresh() }
                        { btnAdd() }
                    </Stack>
                </Grid2>
            </Grid2>
        </>
    );
}