import { Card, Grid, makeStyles, Typography } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '3px',

    padding: '20px',

    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
}));

export default function Contact() {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        item
        container
        direction="column"
        xs={11}
        md={8}
        lg={6}
        className={classes.card}
      >
        <Grid item>
          <Typography
            variant="body1"
            align="center"
            style={{
              fontSize: '1.5rem',
              color: '#7C000095',
              fontWeight: 'bold',
            }}
          >
            Found a bug in the app?
          </Typography>
        </Grid>

        <Grid item style={{ marginTop: '10px' }}>
          <a
            href="mailto:shivanshusr82@gmail.com"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Grid container item justify="center" alignItems="center">
              <Typography
                component={'span'}
                style={{
                  fontSize: '1.4rem',
                  marginRight: '5px',
                  color: '#7C0000',
                }}
              >
                Mail us
              </Typography>
              <MailOutline size="large" style={{ fill: '#7C0000' }} />
            </Grid>
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
}
