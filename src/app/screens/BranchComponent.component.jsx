import React from 'react';
import { Link } from 'react-router-dom';

import { image } from './images';
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import forwardArrow from '../../assets/forwardArrow.svg';
import { useTheme } from '@material-ui/styles';

const branch = [
  { name: 'Computer Science', to: '/cse' },
  { name: 'Electronics and Communication', to: '/ece' },
  { name: 'Civil', to: '/ce' },
  { name: 'Electrical', to: '/ee' },
  { name: 'Material Science', to: '/ms' },
  { name: 'Mechanical', to: '/me' },
  { name: 'Mathematics and Scientific Computing', to: '/ma' },
];

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
    backgroundImage: `url(${image}.${image}${Math.floor(Math.random() * 4)})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '60%',
    width: '100%',
    color: 'white',
    borderRadius: '3px',
  },
}));

export default function BranchComponent({ match, location, history }) {
  console.log(match, location, history);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  console.log(match.url);

  console.log(image[Math.floor(Math.random() * 4)]);
  return (
    <>
      <Grid container direction="column" style={{ marginBottom: '140px' }}>
        <Grid
          item
          container
          direction="row"
          justify={
            matchesXs ? 'center' : matchesMd ? 'space-around' : 'flex-start'
          }
        >
          {branch.map((branch) => (
            <Grid
              item
              container
              lg={3}
              md={3}
              sm={5}
              xs={9}
              direction="column"
              component={Link}
              to={`${match.url}${branch.to}`}
              key={`${branch.name}${branch.to}`}
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
                  style={{ marginTop: '10px', padding: '4px' }}
                  component="h2"
                >
                  {branch.name}
                </Typography>
              </Grid>

              <Grid
                item
                style={{ marginTop: '18px', borderTop: '1px solid #eee' }}
              >
                <Grid item container direction="row" justify="flex-end">
                  <IconButton style={{ backgroundColor: 'transparent' }}>
                    <Button component={Link} to={`${match.url}${branch.to}`}>
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
