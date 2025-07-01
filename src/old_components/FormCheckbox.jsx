import * as React from 'react';
import { FormControl, FormLabel, FormHelperText, TextField, Stack, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';

export default function FormCheckbox({ question_label, labels, data, handleChange = () => {}, field_name, is_disabled, is_required, has_others=false, errors }) {

    // console.log(labels.length)

    // console.log(data[field_name])

    React.useEffect(() => {
        // console.log(typeof data[field_name])

        // if (data[field_name].length() > 0) {
        if (typeof data[field_name] === 'object') {
            data[field_name] = data[field_name].map(Number); //Convert array contents from string to int IF there are string values
        }
    }, [])

    return (
        <FormControl
            error={errors[field_name]}
            required={is_required}
            disabled={is_disabled}
        >
            <FormLabel>{question_label}</FormLabel>

            <FormGroup>
                {labels.map((label, index) => (
                    <FormControlLabel
                        key={index}
                        label={label}
                        control={
                            <Checkbox
                                checked={data[field_name].includes(index) || false}
                                onChange={() => handleChange(field_name, index)}
                            />
                        }
                    />
                ))}

                {has_others && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={data[field_name].includes(labels.length) || false}
                                onChange={() => handleChange(field_name, labels.length)}
                            />
                        }
                        label={
                            <Stack direction="row" spacing={2} alignItems="center" width="100%">
                                <span>Others: </span>
                                <TextField
                                    fullWidth
                                    required={data[field_name].includes(labels.length)}
                                    disabled={is_disabled}
                                    variant='standard'
                                    type='text'
                                    value={data[`${field_name}_others`]}
                                    onChange={e => handleChange(`${field_name}_others`, e.target.value)}
                                    error={Boolean(errors[`${field_name}_others`])}
                                    helperText={errors[`${field_name}_others`]}
                                />
                            </Stack>
                        }
                    />
                )}
            </FormGroup>
            {Boolean(errors[field_name]) && <FormHelperText>{errors[field_name]}</FormHelperText>}
        </FormControl>
    );
}
