import * as React from 'react';
import { FormControl, FormLabel, FormHelperText, TextField, Stack, FormGroup, FormControlLabel, Box } from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

export default function FormAutocomplete({ field_label, labels, data, handleChange = () => {}, field_name, is_disabled, is_required, errors }) {

    // console.log(labels.length)

    // console.log(data[field_name])
    const filter = createFilterOptions();

    return (
        <FormControl
            fullWidth
            error={Boolean(errors[field_name])}
        >
            <Autocomplete
                disablePortal
                disabled={is_disabled}
                options={labels}

                getOptionDisabled={(option) => option.label === 'Others (please specify)'}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
                value={data[field_name]}
                onChange={(e, value) => handleChange(field_name, value.value)}
                filterOptions={(options, params) => { //This is how we add "custom" values
                    const filtered = filter(options, params); // Apply default filtering
                    const { inputValue } = params;

                    // Check if the input value already exists
                    const isExisting = options.some((option) =>
                        typeof option === "string" ? option === inputValue : option.label === inputValue
                    );

                    // If the input value is not empty and does not already exist, suggest adding it
                    if (inputValue !== "" && !isExisting) {
                        filtered.push({
                            value: inputValue, // Store the actual value
                            label: `Add "${inputValue}"`, // Display this to user
                        });
                    }

                    return filtered;
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={field_label}
                        required={is_required}
                        error={Boolean(errors[field_name])}
                        helperText={errors[field_name]}
                />)}
            />
        </FormControl>
    );
}
