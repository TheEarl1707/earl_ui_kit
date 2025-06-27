import * as React from 'react';
import { route } from "ziggy-js";
import { Link, router } from '@inertiajs/react';
import { Button, Typography, Grid2, IconButton } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BtnBack({ route_name, text, data }) {
    const onClick = () => {
        router.get(route(route_name));
    }

    return (
        // <IconButton
        //     onClick={ onClick }
        // >
        //     <ArrowBackIcon />
        // </IconButton>

        <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={ onClick }
            color='inherit'
        >
            <Typography variant='body1'>{ text }</Typography>
        </Button>
    );
}
