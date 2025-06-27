import * as React from 'react';
import { FormControl, FormLabel, FormHelperText, TextField, Stack, FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup } from '@mui/material';

export default function FormRadio({ question_label, radios, data, handleChange = () => {}, field_name, is_disabled, is_required, is_true_false=false, errors }) {

    return (
        <FormControl
            fullWidth
            error={Boolean(errors[field_name])}
            disabled={is_disabled}
            required={is_required}
        >
            <FormLabel>{question_label}</FormLabel>

            <RadioGroup
            row
                name={field_name}
                value={data[field_name]}
                onChange={e => handleChange(field_name, (is_true_false) ? e.target.value === "true" :e.target.value)}
            >
                {radios.map((radio, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Radio />}
                        label={radio.label}
                        value={radio.value}
                    />
                ))}
            </RadioGroup>
            {Boolean(errors[field_name]) && <FormHelperText>{errors[field_name]}</FormHelperText>}
        </FormControl>
    );
}
