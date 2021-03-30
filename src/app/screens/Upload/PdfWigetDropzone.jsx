import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Grid } from '@material-ui/core';

export default function PdfWidgetDropzone({ setFiles, files }) {
  const dropzoneStyles = {
    border: 'solid 2px #0B72B9',
    borderRadius: '2px',
    padding: '10px',
    textAlign: 'center',
  };

  const dropzoneActive = {
    border: 'solid 2px #0B72B9',
  };
  console.log(!!files[0], 'hii');

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setFiles(acceptedFiles);
      // console.log(acceptedFiles);
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container style={{ marginTop: '20px' }}>
      <Grid
        item
        xs={6}
        {...getRootProps()}
        style={
          isDragActive
            ? { ...dropzoneStyles, ...dropzoneActive }
            : dropzoneStyles
        }
      >
        <input {...getInputProps()} />
        <CloudUploadIcon fontSize="large" />
        {!isDragActive && (
          <div style={{ fontSize: '10px' }}>
            Drop or Select the file to upload
          </div>
        )}
      </Grid>
    </Grid>
  );
}
