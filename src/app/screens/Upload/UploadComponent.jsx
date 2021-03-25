import { Button, Grid, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import MyTextField from './MyTextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PdfWidgetDropzone from './PdfWigetDropzone';
import cuid from 'cuid';
import { uploadToFirebaseStorage } from '../../firestore/firebaseService';
import { uploadPdf } from '../../firestore/firestoreService';

import { dataSubjects } from './data';
import { toast } from 'react-toastify';

export default function UploadComponent() {
  const subjects = dataSubjects;
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [loadingValue, setLoadingValue] = useState(0);

  function handleUploadPdf(pdf) {
    setLoading(true);
    const filename =
      cuid() +
      '.' +
      files[0].name.slice(((files[0].name.lastIndexOf('.') - 1) >>> 0) + 2);

    const uploadTask = uploadToFirebaseStorage(files[0], filename);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setLoadingValue(Math.round(progress));
      },
      (error) => {
        console.log('here');
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          uploadPdf(downloadUrl, pdf, files[0].name)
            .then(() => {
              toast.success('Pdf uploaded successfully');
              setLoading(false);
            })
            .catch((error) => {
              console.log('here');

              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  return (
    <Formik
      initialValues={{ Name: '', category: '' }}
      validationSchema={Yup.object({
        Name: Yup.mixed().required(),
        category: Yup.mixed().required(),
      })}
      onSubmit={async (
        values,
        { setSubmitting, setErrors, resetForm, setFieldValue }
      ) => {
        try {
          await handleUploadPdf(values);
          setFiles([]);
          resetForm();
          setSubmitting(false);
        } catch (error) {
          console.log('here');
          toast.error('Something went wrong');
        }
      }}
    >
      {({
        values,
        setFieldValue,
        isSubmitting,
        isValid,
        dirty,
        errors,
        touched,
      }) => (
        <Form>
          {isSubmitting}
          <Grid container justify="center">
            <Grid
              item
              xs={10}
              md={8}
              lg={6}
              style={{
                boxShadow:
                  '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                padding: '20px',
                marginBottom: '140px',
              }}
            >
              {loading && (
                <Grid item container alignItems="center" justify="center">
                  <Grid item xs={9} style={{ marginRight: '4px' }}>
                    <LinearProgress
                      variant="determinate"
                      value={loadingValue}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ color: '#83878D', marginLeft: '8px' }}
                  >
                    {loadingValue}%
                  </Grid>
                </Grid>
              )}
              <MyTextField name="Name" style={{ marginTop: '10px' }} />

              <Autocomplete
                style={{ marginTop: '30px' }}
                id="100"
                className="films-select"
                name="category"
                options={subjects}
                value={values.category}
                getOptionLabel={(option) => option}
                onChange={(e, value) => {
                  setFieldValue('category', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.category}
                    helperText={!!errors.category ? errors.category : ''}
                    name="category"
                    label="Subject"
                    value={values.category}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              <PdfWidgetDropzone
                setFiles={setFiles}
                files={files}
                style={{ marginTop: '30px' }}
              />
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                {files[0]?.name}
              </div>

              <Button
                color="primary"
                type="submit"
                variant="contained"
                disabled={!isValid || !dirty || isSubmitting || !files[0]}
                style={{ marginTop: '20px' }}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

// <TextField
//             error={!!errors.pdf}
//             helperText={!!errors.pdf ? errors.pdf : ''}
//             type="file"
//             name="pdf"
//             onChange={(e) => setFieldValue('pdf', e.currentTarget.files[0])}
//           />
