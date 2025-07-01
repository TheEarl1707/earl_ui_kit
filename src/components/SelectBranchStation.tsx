import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
    auth_user: any;
    default_value: string;
    branch_station: string;
    setBranchStation: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectBranchStation({ auth_user, default_value, branch_station, setBranchStation }: Props): React.ReactNode {
    const branch_stations: string[] = (auth_user.role == 'Admin' || auth_user.role == 'Program Management')
        ? ['All', 'PhilRice Agusan', 'PhilRice Batac', 'PhilRice Bicol', 'PhilRice CES', 'PhilRice Isabela', 'PhilRice Los Baňos', 'PhilRice Midsayap', 'PhilRice Negros']
        : ['All', auth_user.branch_station];

    return (
        <FormControl fullWidth>
            <InputLabel id="select-station-label">Branch Station</InputLabel>
            <Select
                labelId="select-station-label"
                id="select-station"
                label="Branch Station"
                defaultValue={default_value}
                value={branch_station}
                onChange={e => setBranchStation(e.target.value)}
            >
                {branch_stations.map((branch_station, index) => (
                    <MenuItem key={index} value={branch_station}>{branch_station}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}