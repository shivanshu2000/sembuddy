import { Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from '@material-ui/icons';
import React from 'react';

import github from '../../assets/github.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    background: '##fff',
    padding: '20px',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',

    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },

  youtube: {
    color: 'red',
  },
  logoContainer: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '15px',
    },
  },

  icons: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '15px',
      marginRight: '15px',
      padding: '12px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      marginRight: '10px',
      padding: '5px',
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  const date = new Date();
  const year = date.getFullYear();

  const theme = useTheme();
  // const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  // const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));
  // const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        justify="flex-end"
        sm={9}
        className={classes.iconsContainer}
      >
        <Grid item className={classes.icons}>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <Instagram size="large" />
          </a>
        </Grid>
        <Grid item className={classes.icons}>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <YouTube size="large" className={classes.youtube} />
          </a>
        </Grid>
        <Grid item className={classes.icons}>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <Twitter size="large" color="primary" />
          </a>
        </Grid>
        <Grid item className={classes.icons}>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <Facebook size="large" color="primary" />
          </a>
        </Grid>
        <Grid item className={classes.icons}>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <LinkedIn size="large" style={{ fill: 'blue' }} />
          </a>
        </Grid>
        <Grid item className={classes.icons}>
          <a
            href="https://github.com/shivanshu2000"
            rel="noreferrer"
            target="_blank"
          >
            <GitHub style={{ fill: 'black' }} />
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
}
