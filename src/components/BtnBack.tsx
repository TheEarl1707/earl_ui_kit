import * as React from 'react';
import { route } from "ziggy-js";
import { router } from '@inertiajs/react';
import { Button, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    route_name: string;
    text: string;
}

export default function BtnBack({ route_name, text }: Props): React.ReactNode {
    const onClick = (): void => {
        router.get(route(route_name));
    }

    return (
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
