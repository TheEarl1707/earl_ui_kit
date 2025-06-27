import * as React from 'react';
import { FormControl, InputLabel, FormLabel, FormHelperText, TextField, Stack, FormGroup, FormControlLabel, Divider, MenuItem, Select, IconButton, Grid2, Button } from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function FormDynamicField({ data, fields, setRowReference, handleChangeMultiple = () => {}, is_disabled, errors }) {

    const [counter, setCounter] = React.useState(1);

    const handleRemoveRow = (index) => {
        fields.forEach(({ name }) => handleChangeMultiple(name, index, "", true));

        // setRowIDs(prevIDs => prevIDs.filter((_, i) => i !== index)); // Remove row ID //! This works for single field

        setRowReference(prevRef => {
            const firstFieldName = fields[0].name; // Track only the first field

            return {
                ...prevRef,
                [firstFieldName]: prevRef[firstFieldName]?.filter((_, i) => i !== index) // Remove only the target index
            };
        });
    };

    const handleAddRow = () => {
        //This should add the new row ID for tracking //! This works for single field
        // setRowIDs(prevIDs => {
        //     const newID = `new${prevIDs.length + 1}`;
        //     return [...prevIDs, newID]; // Ensures only one new ID is added
        // });

        setRowReference(prevRef => {
            const firstFieldName = fields[0].name; // Track only the first field
            const newID = `new${counter}`;

            setCounter(prevCounter => prevCounter + 1); // Ensure counter updates correctly

            return {
                ...prevRef,
                [firstFieldName]: [...(prevRef[firstFieldName] || []), newID] // Update only the first field
            };
        });

        fields.forEach(({ name, is_multiple, type }) => {
            const new_entry = (is_multiple)
                ? []
                : (type == 'date')
                    ? dayjs()
                    : '';

            handleChangeMultiple(name, data[name]?.length || 0, new_entry);
        });
    };

    //Record the initial row IDs
    React.useEffect(() => {
        // const initialIDs = data[fields[0].name].map((_, index) => (index + 1).toString()); // [1, 2, 3]
        // setRowIDs(initialIDs);

        // console.log(data)
        // console.log(data[fields[0].name])

        //Update the initial row reference with the existing data from the server
        setRowReference(prevRef => {
            const firstFieldName = fields[0].name; // Track only the first field

            return {
                ...prevRef,
                [firstFieldName]: data.row_reference[firstFieldName]
            };
        });
    }, []);

    // React.useEffect(() => {
    //     console.log(rowIDs)
    // }, [rowIDs])

    //! Custom template fields for use in dynamic fields
    const handleField = ({ type, is_required, label, name, index, options, is_disabled_future=true, is_multiple=false, is_row_reference=false }) => {
        switch (type) { //Only 4 types because those are the only identified types
            case 'text':
                return (
                    <TextField
                        fullWidth
                        required={is_required}
                        disabled={is_disabled}
                        label={label}
                        variant='outlined'
                        type='text'
                        value={data[name][index]}
                        onChange={(e) => handleChangeMultiple(name, index, e.target.value)}
                        error={Boolean(errors[`${name}.${index}`])}
                        helperText={errors[`${name}.${index}`]}
                        id={`dynamic-${ name }-${ index }`}
                    />
                );

            case 'select':
                return (
                    <FormControl
                        fullWidth
                        error={Boolean(errors[`${name}.${index}`])}
                        disabled={is_disabled}
                        required={is_required}
                    >
                        <InputLabel>{label}</InputLabel>
                        <Select
                            // labelId="select-station-label"
                            // id="select-station"
                            multiple={is_multiple}
                            label={label}
                            value={data[name][index]}
                            onChange={e => handleChangeMultiple(name, index, e.target.value, false, is_multiple)}
                        >
                            {options.map((option, index) => (
                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                        { Boolean(errors[`${name}.${index}`]) && (<FormHelperText>{errors[`${name}.${index}`]}</FormHelperText>)}
                    </FormControl>
                );

            case 'autocomplete':
                const filter = createFilterOptions();

                return (
                    <FormControl
                        fullWidth
                        error={Boolean(errors[`${name}.${index}`])}
                    >
                        <Autocomplete
                            disablePortal
                            disabled={is_disabled}
                            options={options}
                            freeSolo
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            getOptionLabel={(option) => (typeof option === "string" ? option : option?.label || "")}
                            // getOptionDisabled={(option) => option.label.includes('please specify')}
                            getOptionDisabled={(option) => typeof option === "object" && option.label?.includes('please specify')}
                            value={data[name][index] ?? ''}
                            // onChange={(e, value) => handleChangeMultiple(name, index, typeof value === "string" ? value : value?.value || value )}
                            // onChange={(e, value) => handleChangeMultiple(name, index, value?.value ?? value )}
                            // onChange={(e, value) => handleChangeMultiple(name, index, value.value)}
                            // onChange={(e, value) => {console.log(e, value)}}
                            onChange={(e, value) => {
                                if (typeof value === "string") {
                                    handleChangeMultiple(name, index, value);
                                } else {
                                    handleChangeMultiple(name, index, value?.value ?? value );
                                }
                            }}
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
                                    label={label}
                                    required={is_required}
                                    error={Boolean(errors[`${name}.${index}`])}
                                    helperText={errors[`${name}.${index}`]}
                            />)}
                        />
                    </FormControl>
                )

            case 'date':
                return (
                    <FormControl
                        fullWidth
                        error={Boolean(errors[`${name}.${index}`])}
                        required={is_required}
                    >
                        <DatePicker
                            // value={dayjs(data[name][index])}
                            value={data[name][index] ? dayjs(data[name][index]) : dayjs()}
                            label={label}
                            // onChange={(e, date) => handleChangeMultiple(name, index, date?.format("YYYY-MM-DD"), false, false)}
                            onChange={(date) => {
                                const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : ""; // Ensure format
                                handleChangeMultiple(name, index, formattedDate, false, false);
                            }}
                            disabled={is_disabled}
                            disableFuture={is_disabled_future}
                        />

                        {Boolean(errors[`${name}.${index}`]) && <FormHelperText>{errors[`${name}.${index}`]}</FormHelperText>}
                    </FormControl>
                )

            default:
                break;
        }
    }

    const btnDeleteRow = (index) => {
        const btn = (!is_disabled)
            ? <IconButton key={index} onClick={() => handleRemoveRow(index)}>
                <CloseIcon />
            </IconButton>
            : '';

        return btn
    }

    const btnAddRow = (!is_disabled)
        ? <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Button
                variant='outlined'
                sx={{ display: "block", margin: "auto" }}
                onClick={() => handleAddRow()}
            >Add Row</Button>
        </Grid2>
        : '';

        // React.useEffect(() => {
        //     console.log(is_disabled)
        // })

    return (
        <>
            {data[fields[0].name].map((_, index) => ( //This loop is how many rows to render
                <>
                    {fields.map((field, index2) => { //Loop how many columns
                        if (index2 == 0) {
                            return (
                                <Grid2 size={field.size}>
                                    <Stack direction="row" >
                                        {btnDeleteRow(index)}

                                        {handleField({
                                            type: field.type,
                                            is_required: field.is_required,
                                            label: field.label,
                                            name: field.name,
                                            index: index,
                                            options: field?.options,
                                            is_disabled_future: field?.is_disabled_future,
                                            is_multiple: field?.is_multiple,
                                        })}
                                    </Stack>
                                </Grid2>
                            )
                        } else {
                            return (
                                <Grid2 size={field.size}>
                                    {handleField({
                                        type: field.type,
                                        is_required: field.is_required,
                                        label: field.label,
                                        name: field.name,
                                        index: index,
                                        options: field?.options,
                                        is_disabled_future: field?.is_disabled_future,
                                        is_multiple: field?.is_multiple
                                    })}
                                </Grid2>
                            )
                        }
                    })}

                </>
            ))}

            {btnAddRow}

        </>
    );
}