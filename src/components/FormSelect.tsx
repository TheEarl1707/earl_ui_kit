import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
    data: any;
    handleChange?: (fieldName: string, value: any) => void;
    options: Record <string, any>[];
    error: any;
    is_required: boolean;
    is_disabled: boolean;
    label: string;
    field_name: string;
}

export default function FormSelect({ data, handleChange = () => {}, options, error, is_required, is_disabled, label, field_name }: Props): React.ReactNode {
    return (
        <FormControl
            fullWidth
            error={Boolean(error)}
            disabled={is_disabled}
            required={is_required}
        >
            <InputLabel>
                {label}
            </InputLabel>
            <Select
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