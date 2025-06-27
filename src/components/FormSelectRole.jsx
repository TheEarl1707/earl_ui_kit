import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

//! Possible to make an actual template component for select, since we can try to provide an object for the menu items

export default function FormSelectRole({ data, handleChange = () => {}, error, isRequired, isDisabled }) {
    return (
        <FormControl
            fullWidth error={Boolean(error)}
            disabled={isDisabled}
            required={isRequired}
        >
            <InputLabel id="select-role-label">Role</InputLabel>
            <Select
                labelId="select-role-label"
                id="select-role"
                label="Role"
                value={data}
                onChange={e => handleChange('role', e.target.value)}
            >
                <MenuItem value={''}>Select Role</MenuItem>
                <MenuItem value={'Focal Person'}>Focal Person</MenuItem>
                <MenuItem value={'Program Management'}>Program Management</MenuItem>
                <MenuItem value={'Station Staff'}>Station Staff</MenuItem>
                <MenuItem value={'Admin'}>Admin</MenuItem>
            </Select>
            { error && (<FormHelperText>{error}</FormHelperText>)}
        </FormControl>
    );
}