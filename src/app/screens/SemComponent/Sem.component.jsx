import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import forwardArrow from '../../../assets/forwardArrow.svg';
import { image } from '../images';

import { data } from './data';
const useStyles = makeStyles((theme) => ({
  card: {
    marginLeft: '15px',
    marginRight: '15px',
    height: '220px',
    // width: '250px',
    [theme.breakpoints.up('md')]: {
      marginTop: '15px',
      marginBottom: '15px',
    },

    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      marginBottom: '10px',
    },

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
const SemComponent = ({ match }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  console.log(match.url);

  const year = match.params.year;

  const branch = year === 'first' ? 'cse' : match.params.branch;
  const details = data;
  // console.log(details[year][branch], 'hii', branch);
  // console.log(details);

  return (
    <Grid container direction="column" style={{ marginBottom: '140px' }}>
      <Grid
        item
        container
        direction="row"
        justify={
          matchesXs ? 'center' : matchesMd ? 'space-around' : 'flex-start'
        }
      >
        {details[year][branch].map((detail) => (
          <Grid
            item
            container
            lg={3}
            md={3}
            sm={5}
            xs={9}
            direction="column"
            component={Link}
            to={`${match.url}/${detail.split(' ').join('-')}`}
            key={`${detail}`}
            className={classes.card}
          >
            <Grid
              item
              className={classes.imageContainer}
              style={{
                backgroundImage: `url(${image[Math.floor(Math.random() * 5)]})`,
              }}
            >
              <Typography
                variant="h5"
                style={{ marginTop: '10px', padding: '4px' }}
                component="h2"
              >
                {detail}
              </Typography>
            </Grid>

            <Grid
              item
              style={{ marginTop: '18px', borderTop: '1px solid #eee' }}
            >
              <Grid item container direction="row" justify="flex-end">
                <IconButton style={{ backgroundColor: 'transparent' }}>
                  <Button
                    component={Link}
                    to={`${match.url}/${detail.split(' ').join('-')}`}
                  >
                    <img src={forwardArrow} alt="TO Branch page" />
                  </Button>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SemComponent;
