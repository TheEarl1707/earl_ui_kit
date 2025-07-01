import * as React from 'react';
import { TextField, Stack, IconButton, Grid, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    data: any;
    handleChangeMultiple?: (fieldName: string, index: number, value: any, for_remove?: boolean, is_multiple?: boolean) => void;
    is_disabled?: boolean;
    is_required?: boolean;
    errors?: any;
}

export default function FormContactDetails({ data, handleChangeMultiple = () => {}, is_disabled, is_required, errors }: Props): React.ReactNode {

    const handleRemoveRow = (index: number): void => {
        handleChangeMultiple('method', index, '', true);
        handleChangeMultiple('detail', index, '', true);
    };

    const handleAddRow = (): void => {
        handleChangeMultiple('method', data.method.length, '');
        handleChangeMultiple('detail', data.detail.length, '');
    };

    return (
        <>
        {data['method'].map((item, index: number) => (
            <>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Stack direction="row" >
                        <IconButton key={index} onClick={() => handleRemoveRow(index)}>
                            <CloseIcon />
                        </IconButton>
                        <TextField
                            fullWidth
                            required
                            disabled={is_disabled}
                            label={`Method`}
                            variant='outlined'
                            type='text'
                            value={data['method'][index]}
                            onChange={(e) => handleChangeMultiple("method", index, e.target.value)}
                            error={Boolean(errors.method)}
                            helperText={errors.method}
                        />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <TextField
                        fullWidth
                        required
                        disabled={is_disabled}
                        label={`Detail`}
                        variant='outlined'
                        type='text'
                        value={data['detail'][index]}
                        onChange={(e) => handleChangeMultiple("detail", index, e.target.value)}
                        error={Boolean(errors.detail)}
                        helperText={errors.detail}
                    />
                </Grid>
            </>
        ))}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Button
                    variant='outlined'
                    sx={{ display: "block", margin: "auto" }}
                    onClick={() => handleAddRow()}
                >Add Row</Button>
            </Grid>
        </>
    );
}