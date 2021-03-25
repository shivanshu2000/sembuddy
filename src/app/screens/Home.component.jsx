import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserProfile } from '../firestore/firestoreService';

import PrivateRoute from '../PrivateRoute';
import useFirestoreDoc from '../hooks/useFirestoreDoc';
import { listenToCurrentUserProfile } from './ProfileComponent/profileActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '3px',

    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
}));

export default function Home({ history }) {
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const classes = useStyles();
  console.log(history);

  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.auth);

  useFirestoreDoc({
    query: () => getUserProfile(currentUser.uid),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch],
  });
  // useFirestoreCollection({
  //   query: () => listenToEventsFromFirestore(),
  //   data: (events) => dispatch(listenToPdfs(events)),
  //   deps: [dispatch],
  // });

  return (
    <Grid
      container
      direction="column"
      align="center"
      style={{ marginBottom: '140px' }}
    >
      {!authenticated && <PrivateRoute />}
      <Grid container direction="column" alignItems="center">
        {!loading && (
          <>
            {!!currentUserProfile &&
              !!currentUser &&
              currentUserProfile.role === 'admin' && (
                <Grid
                  item
                  container
                  justify="center"
                  style={{
                    backgroundColor: '#60B33280',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                  xs={11}
                  md={8}
                  lg={6}
                >
                  <Grid item>
                    <Avatar src={currentUserProfile.photoURL} />
                  </Grid>

                  <Grid item style={{ marginLeft: '3px', marginRight: '15px' }}>
                    <Typography variant="h6">
                      You have an admin profile
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ backgroundColor: '#60B332', color: 'white' }}
                      variant="contained"
                      component={Link}
                      to="/profile/me"
                    >
                      Upload here
                    </Button>
                  </Grid>
                </Grid>
              )}
          </>
        )}
      </Grid>
      <Grid item container justify="center" style={{ marginTop: '40px' }}>
        <Grid
          item
          container
          direction="column"
          className={classes.card}
          alignItems="center"
          justify="center"
          style={{
            height: 'auto',
          }}
          xs={10}
          sm={8}
          md={7}
          spacing={5}
        >
          <Grid item>
            <Typography
              variant="h4"
              style={{ color: '#1261A0' }}
              align="center"
            >
              Welcome to SemBuddy
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ fontSize: '1.6rem', fontWeight: 'bold' }}
              align="center"
            >
              Get pdfs/study material of all subjects.
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              style={{ fontSize: '1rem', fontWeight: 'bold' }}
              align="center"
            >
              Explore the app
            </Typography>
          </Grid>

          <Grid item>
            <Button
              component={Link}
              to="/explore"
              variant="contained"
              color="primary"
            >
              Click here
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
