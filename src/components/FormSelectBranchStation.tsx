import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
    data: any;
    handleChange?: (fieldName: string, value: any) => void;
    error: any;
    isRequired: boolean;
    isDisabled: boolean;
}

export default function FormSelectBranchStation({ data, handleChange = () => {}, error, isRequired, isDisabled }: Props): React.ReactNode {
    return (
        <FormControl
            fullWidth error={Boolean(error)}
            disabled={isDisabled}
            required={isRequired}
        >
            <InputLabel id="select-station-label">Branch Station</InputLabel>
            <Select
                labelId="select-station-label"
                id="select-station"
                label="Branch Station"
                value={data}
                onChange={e => handleChange('branch_station', e.target.value)}
            >
                <MenuItem value={''}>Select Branch Station</MenuItem>
                <MenuItem value={'PhilRice Agusan'}>PhilRice Agusan</MenuItem>
                <MenuItem value={'PhilRice Batac'}>PhilRice Batac</MenuItem>
                <MenuItem value={'PhilRice Bicol'}>PhilRice Bicol</MenuItem>
                <MenuItem value={'PhilRice CES'}>PhilRice CES</MenuItem>
                <MenuItem value={'PhilRice Isabela'}>PhilRice Isabela</MenuItem>
                <MenuItem value={'PhilRice Los Baňos'}>PhilRice Los Baňos</MenuItem>
                <MenuItem value={'PhilRice Midsayap'}>PhilRice Midsayap</MenuItem>
                <MenuItem value={'PhilRice Negros'}>PhilRice Negros</MenuItem>
            </Select>
            { error && (<FormHelperText>{error}</FormHelperText>)}
        </FormControl>
    );
}