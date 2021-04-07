import React from 'react';

import { useField } from 'formik';
import { TextField } from '@material-ui/core';

export default function MyTextField({ ...props }) {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      style={{ marginTop: '20px' }}
      fullWidth
      label="Given by"
      value={meta.value}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
}
