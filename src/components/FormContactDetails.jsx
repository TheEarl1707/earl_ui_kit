import * as React from 'react';
import { FormControl, FormLabel, FormHelperText, TextField, Stack, FormGroup, FormControlLabel, Divider, Box, RadioGroup, IconButton, Grid, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function FormContactDetails({ data, handleChangeMultiple = () => {}, is_disabled, is_required, errors }) {

    const handleRemoveRow = (index) => {
        handleChangeMultiple('method', index, '', true);
        handleChangeMultiple('detail', index, '', true);
    };

    const handleAddRow = () => {
        handleChangeMultiple('method', data.method.length, '');
        handleChangeMultiple('detail', data.detail.length, '');
    };

    return (
        <>
        {data['method'].map((item, index) => (
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