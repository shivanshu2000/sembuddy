import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import googleButton from '../assets/googleButton.png';
import { socialLogin } from './firestore/firebaseService';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#00000090',
    zIndex: 25,
    height: '100%',
  },

  container: {
    zIndex: 30,
    position: 'fixed',
    // backgroundColor: 'yellow',
    height: '65%',
  },

  containerChild: {
    backgroundColor: '#ffffff50',
    height: '300px',
    position: 'fixed',
    borderRadius: '10px',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    zIndex: 30,
  },
}));

export default function PrivateRoute() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.backdrop}></div>
      <Grid
        container
        justify="center"
        direction="column"
        className={classes.container}
        alignItems="center"
      >
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="space-evenly"
          xs={11}
          sm={8}
          md={6}
          className={classes.containerChild}
        >
          <Typography align="center" variant="h4" style={{ color: '#fff' }}>
            You need to login first!{' '}
          </Typography>
          <Button
            onClick={() => {
              socialLogin();
            }}
          >
            <img src={googleButton} alt="Google Sign In Button" />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
