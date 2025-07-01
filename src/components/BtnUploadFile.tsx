import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextField, InputAdornment, IconButton} from '@mui/material';

interface Props {
    isMultiple?: boolean;
    handleChange?: any;
    field_name?: any;
    error?: any;
}

export default function BtnUploadFile({ isMultiple=false, handleChange, field_name, error }: Props): React.ReactNode {
    const [selectedFiles, setSelectedFiles] = React.useState<any[]>([]);

    const handleFileChange = (e): void => { //IDK what type "e" is
        const files: any[] = Array.from(e.target.files); // Convert FileList to Array
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
