import * as React from 'react';
import { route } from "ziggy-js";
import { Button, Grid, Stack } from '@mui/material';
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
            <Grid container alignItems="center" justifyContent="space-between" className="py-2">
                <Grid size={8}>
                    <h5 className='ms-2 mt-2'>{ tableName }</h5>
                </Grid>
                <Grid size={4} display="flex" justifyContent="flex-end">
                    <Stack direction="row" spacing={1}>
                        { btnRefresh() }
                        { btnAdd() }
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}