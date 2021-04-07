import { Button, Grid, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import MyTextField from './MyTextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PdfWidgetDropzone from './PdfWigetDropzone';
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

    const cuid = Math.round(Math.random() * 4000);
    const filename =
      files[0].name.split('.pdf')[0] +
      cuid +
      '.' +
      files[0].name.slice(((files[0].name.lastIndexOf('.') - 1) >>> 0) + 2);
    const uploadTask = uploadToFirebaseStorage(files[0], filename);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setLoadingValue(Math.round(progress));
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          uploadPdf(downloadUrl, pdf, files[0].name)
            .then(() => {
              toast.success('File uploaded successfully');
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
          // return console.log(files[0].name.split('.pdf'));
          if (files[0].name.split('.pdf')[0] === '')
            return toast.error('Invalid file name');
          console.log(
            !files[0].name.includes('.pdf') || !files[0].name.includes('.ppt')
          );
          if (files[0].name.length > 35)
            return toast.error(
              'File name is too long. Rename it to a short and understandable one'
            );

          if (
            files[0].name.endsWith('.pdf') ||
            files[0].name.endsWith('.ppt')
          ) {
            await handleUploadPdf(values);
            setFiles([]);
            resetForm();
            setSubmitting(false);
          } else {
            toast.error('Invalid file type. Please upload valid file');
          }
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
