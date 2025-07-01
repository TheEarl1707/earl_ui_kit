import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

export default function FormSelect({ data, handleChange = () => {}, options, error, is_required, is_disabled, label, field_name }) {
    return (
        <FormControl
            fullWidth
            error={Boolean(error)}
            disabled={is_disabled}
            required={is_required}
        >
            <InputLabel
                // id="select-station-label"
            >{label}
            </InputLabel>
            <Select
                // labelId="select-station-label"
                // id="select-station"
                label={label}
                value={data}
                onChange={e => handleChange(field_name, e.target.value)}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
            { Boolean(error) && (<FormHelperText>{error}</FormHelperText>)}
        </FormControl>
    );
}