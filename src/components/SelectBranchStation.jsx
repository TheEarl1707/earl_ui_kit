import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function SelectBranchStation({ defaultValue, branch_station, setBranchStation, auth_user }) {
    const branch_stations = (auth_user.role == 'Admin' || auth_user.role == 'Program Management')
        ? ['All', 'PhilRice Agusan', 'PhilRice Batac', 'PhilRice Bicol', 'PhilRice CES', 'PhilRice Isabela', 'PhilRice Los Baňos', 'PhilRice Midsayap', 'PhilRice Negros']
        : ['All', auth_user.branch_station];

        //TODO: For other users who are not Admin or Program Management, try to only show the branch station that the user is assigned to

    return (
        <FormControl fullWidth>
            <InputLabel id="select-station-label">Branch Station</InputLabel>
            <Select
                labelId="select-station-label"
                id="select-station"
                label="Branch Station"
                defaultValue={defaultValue}
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