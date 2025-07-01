import * as React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

interface Props {
    route: string;
    row_id: string;
}

export default function BtnEdit({ route, row_id }: Props): React.ReactNode {
    const [loading, setLoading] = React.useState(false);

    const onClick = (): void => {
        setLoading(true);
        router.get(`${ route }/${ row_id }`);
    }

    return (
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
