import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack, Typography, TextField, InputAdornment, IconButton} from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});




    // <VisuallyHiddenInput
    //     type="file"
    //     // onChange={(event) => console.log(event.target.files)}
    //     onChange={event => setData('file', event.target.files)}
    //     multiple={isMultiple}
    // />

export default function BtnUploadFile({ isMultiple=false, data, handleChange, field_name, error }) {
    const [selectedFiles, setSelectedFiles] = React.useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to Array
        // console.log(files)

        if (files.length > 5) {
            alert("You can only upload a maximum of 5 files.");
            return;
        }

        setSelectedFiles(files); // Update preview list
        handleChange(field_name, files); // Store files in Inertia form
    }

    return (
        <>
            <TextField
                fullWidth
                label='Photo Documentation'
                value={selectedFiles.length > 0 ? selectedFiles.map(file => file.name).join(", ") : ""}
                slotProps={{
                    input: {
                        readOnly: true, // Prevent manual text editing
                        startAdornment: (
                            <InputAdornment position="start">
                                <input
                                    type="file"
                                    multiple={isMultiple}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    hidden
                                    id="file-upload-input"
                                />
                                <label htmlFor="file-upload-input">
                                    <IconButton component="span">
                                        <CloudUploadIcon />
                                    </IconButton>
                                </label>
                            </InputAdornment>
                        ),
                    },
                }}
                error={Boolean(error)}
                helperText={error}
            />
        </>
    );
}
