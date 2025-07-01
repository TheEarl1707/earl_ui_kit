import * as React from 'react';
import { Autocomplete, TextField, FormControl } from '@mui/material';

interface Props {
    label: string;
    options: any[];
    data: any;
    handleChange?: (fieldName: string, value: any) => void;
    field_name: string;
    is_disabled: boolean;
    setAreaCode: any; // Function to set area code
    errors: any;
    is_required: boolean;
}

export default function FormSelectLocation({ label, options, data, handleChange, field_name, is_disabled, setAreaCode, errors, is_required }) {
    return (
        <FormControl
            fullWidth
            error={Boolean(errors[field_name])}
        >
            <Autocomplete
                options={options}
                value={options.find(opt => opt.psgc === data[field_name]) || ''} // Ensure value is in 'options'
                disabled={is_disabled}
                onChange={(event, newValue) => {
                    handleChange(field_name, newValue ? newValue.psgc : ""); // Update `data`
                    setAreaCode(newValue ? newValue.area_code : "");
                }}
                isOptionEqualToValue={(option, value) => option.psgc === value.psgc} // Ensures selection stays
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        required={is_required}
                        error={Boolean(errors[field_name])}
                        helperText={errors[field_name]}
                    />
                )}
            />
        </FormControl>
    );
}