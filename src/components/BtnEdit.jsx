import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button, Grid, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

export default function BtnEdit({ route, row_id }) {
    const [loading, setLoading] = React.useState(false);

    const onClick = () => {
        setLoading(true);
        router.get(`${ route }/${ row_id }`);
    }

    return (
        // <IconButton
        //     onClick={ onClick }
        //     color='warning'
        // >
        //     <EditIcon />
        // </IconButton>

        <Button
            className='mt-2'
            variant='contained'
            onClick={ onClick }
            color='warning'
            loading={loading}
        >
            <EditIcon />
        </Button>
    );
}
