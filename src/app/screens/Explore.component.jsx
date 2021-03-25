import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, IconButton, Typography, useMediaQuery } from '@material-ui/core';

import forwardArrow from '../../assets/forwardArrow.svg';
import { makeStyles, useTheme } from '@material-ui/styles';

const years = [
  { year: '1st', to: '/first' },
  { year: '2nd', to: '/second' },
  { year: '3rd', to: '/third' },
  { year: '4th', to: '/fourth' },
];

const useStyles = makeStyles((theme) => ({
  card: {
    marginLeft: '15px',
    marginRight: '15px',
    height: '300px',

    [theme.breakpoints.up('md')]: {
      marginLeft: '35px',
      marginRight: '25px',
    },
    marginTop: '15px',
    marginBottom: '15px',
    textDecoration: 'none',
    borderRadius: '3px',

    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },

  imageContainer: {
    backgroundImage:
      'url(https://gstatic.com/classroom/themes/img_learnlanguage.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '70%',
    width: '100%',
    color: 'white',
    borderRadius: '3px',
  },
}));

export default function Explore({ match }) {
  const classes = useStyles();

  const images = [
    'https://gstatic.com/classroom/themes/img_code.jpg',
    'https://gstatic.com/classroom/themes/img_learnlanguage.jpg',
    'https://gstatic.com/classroom/themes/img_breakfast.jpg',
  ];

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(match);
  return (
    <>
      <Grid container direction="column" style={{ marginBottom: '140px' }}>
        <Grid
          item
          container
          className={classes.container}
          direction="row"
          justify={matchesXs ? 'center' : 'flex-start'}
        >
          {years.map((year) => (
            <Grid
              item
              container
              md={3}
              sm={5}
              xs={9}
              direction="column"
              component={Link}
              to={`${match.path}${year.to}`}
              key={`${year.year}${year.to}`}
              className={classes.card}
            >
              <Grid item className={classes.imageContainer}>
                <Typography
                  variant="h5"
                  style={{ marginTop: '10px', padding: '10px' }}
                  component="h2"
                >
                  {year.year} Year
                </Typography>
              </Grid>

              <Grid item style={{ marginTop: '18px' }}>
                <Grid item container direction="row" justify="flex-end">
                  <IconButton style={{ backgroundColor: 'transparent' }}>
                    <img src={forwardArrow} alt="TO Branch page" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
