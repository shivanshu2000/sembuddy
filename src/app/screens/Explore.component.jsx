import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { image } from './images';

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
    height: '220px',

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
    height: '60%',
    width: '100%',
    color: 'white',
    borderRadius: '3px',
  },
}));

export default function Explore({ match }) {
  const classes = useStyles();

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
              <Grid
                item
                className={classes.imageContainer}
                style={{
                  backgroundImage: `url(${
                    image[Math.floor(Math.random() * 5)]
                  })`,
                }}
              >
                <Typography
                  variant="h5"
                  style={{ marginTop: '10px', padding: '10px' }}
                  component="h2"
                >
                  {year.year} Year
                </Typography>
              </Grid>

              <Grid
                item
                style={{ marginTop: '18px', borderTop: '1px solid #eee' }}
              >
                <Grid item container direction="row" justify="flex-end">
                  <IconButton style={{ backgroundColor: 'transparent' }}>
                    <Button component={Link} to={`${match.path}${year.to}`}>
                      <img src={forwardArrow} alt="TO Branch page" />
                    </Button>
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
