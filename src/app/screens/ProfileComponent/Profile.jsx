import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import UploadComponent from '../Upload/UploadComponent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import { getUserProfile } from '../../firestore/firestoreService';
import { listenToCurrentUserProfile } from './profileActions';

export default function Profile({ history }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  useFirestoreDoc({
    query: () => getUserProfile(currentUser?.uid),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch],
  });
  const { currentUserProfile } = useSelector((state) => state.profile);

  if (currentUser === null) {
    return <Redirect to="/" />;
  }

  if (!!currentUserProfile === false && currentUserProfile?.role !== 'admin') {
    return (
      <Grid item container justify="center">
        <CircularProgress color="primary" />
      </Grid>
    );
  }

  return (
    <>
      {!!currentUserProfile && currentUserProfile.role === 'admin' ? (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            style={{ marginBottom: '25px' }}
          >
            <Grid item xs={10} md={8} lg={6}>
              <Accordion
                style={{
                  border: '1px solid #FFC10780',
                  backgroundColor: '#FFC10750',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Expand me</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ marginTop: '-28px' }}>
                  <ul>
                    <li style={{ marginBottom: '4px' }}>
                      You've an admin role. Please be careful while uploading
                      files
                    </li>
                    <li>
                      Make sure the name of pdf is unique.(not
                      Adobe-scan-545.pdf,rename it if this is the case)
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
          <UploadComponent />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
