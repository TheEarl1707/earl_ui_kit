import * as React from 'react';
import { route } from "ziggy-js";
import { Button, Grid, Stack } from '@mui/material';
import { Link, router } from '@inertiajs/react'

interface DatatableHeaderProps {
    can_add: boolean;
    add_route: string;
    table_name: string;
    btn_add_text?: string;
    getRows: (params?: Record<string, any>) => void;
}

export default function DatatableHeader({ can_add, add_route, table_name, btn_add_text='Add', getRows }: DatatableHeaderProps): React.ReactNode {

    const btnAdd = (): React.ReactNode | null => { //React.ReactNode should also include jsx
        const onClick = (): void => {
            router.get(route(add_route));
        }

        if (can_add) {
            return (
                <Button
                    className='me-2'
                    variant='outlined'
                    onClick={ onClick }
                >{ btn_add_text }
                </Button>
            )
        }
    }

    const btnRefresh = (): React.ReactNode => {
        const onClick = (): void => {
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
                    <h5 className='ms-2 mt-2'>{ table_name }</h5>
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