import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEventFromFirestore } from '../firestore/firestoreService';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
import PrivateRoute from '../PrivateRoute';
import { listenToPdfs } from './pdfActions';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '3px',
    [theme.breakpoints.up('xs')]: {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: '5px',
      marginLeft: '7px',
      marginRight: '7px',
      marginTop: '7px',
      marginBottom: '9px',
    },
    boxShadow:
      '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 6px 0 rgba(0, 0, 0, 0.19)',
  },

  header: {
    [theme.breakpoints.down('md')]: {
      marginTop: '-10px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '-10px',
    },
  },

  responsiveMargin: {
    [theme.breakpoints.up('xs')]: {
      // marginLeft: '6px',
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: '6px',
    },
  },

  responsivePadding: {},
}));

export default function PDFComponent({ match, history }) {
  const classes = useStyles();

  const theme = useTheme();

  const belowXs = useMediaQuery(theme.breakpoints.down('xs'));
  const belowSm = useMediaQuery(theme.breakpoints.down('sm'));

  const filter = match.params.subject.split('-').join(' ');
  console.log(filter);

  const { pdfs } = useSelector((state) => state.pdf);
  const { authenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.async);

  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToEventFromFirestore(filter),
    data: (events) => dispatch(listenToPdfs(events)),
    deps: [dispatch],
  });

  useEffect(() => {
    return () => {
      dispatch({ type: 'LEFT_COMPONENT' });
    };
  }, [dispatch]);
  console.log(match.params, history);

  // if (pdfs.length === 0) {
  //   setText(`No pdf uploaded for ${filter}`);
  // }

  return (
    <Grid container direction="column" style={{ marginBottom: '140px' }}>
      {!authenticated && <PrivateRoute />}
      <Grid item container justify="center" className={classes.header}>
        <Typography
          // component={'h1'}
          variant="h4"
          align="center"
          style={{
            border: '1px solid #FFC10780',
            backgroundColor: '#FFC10750',
            borderRadius: '10px',
            padding: 10,
          }}
        >
          {filter}
        </Typography>
      </Grid>
      {!loading && pdfs.length === 0 ? (
        <Grid item style={{ marginLeft: '25px', marginTop: '25px' }}>
          No pdf uploaded
        </Grid>
      ) : null}

      {loading === false ? (
        <Grid
          item
          container
          style={{ padding: '20px' }}
          justify={belowSm ? 'space-evenly' : 'space-evenly'}
        >
          {pdfs.map((pdf) => (
            <Grid
              item
              container
              // direction="column"
              key={`${pdf.id}`}
              xs={12}
              sm={8}
              md={4}
              lg={3}
              className={classes.card}
              // alignItems="center"
              // style={{ padding: '5px' }}
            >
              {!belowXs && (
                <Grid
                  item
                  style={{
                    height: '100%',
                    width: '40px',

                    // backgroundColor: 'pink',
                  }}
                  xs={1}
                >
                  <PictureAsPdf style={{ fill: 'red' }} />
                </Grid>
              )}

              <Grid
                item
                sm={10}
                className={classes.responsiveMargin}
                // style={{  }}
              >
                <Grid
                  item
                  container
                  direction="column"
                  style={{ overflow: 'hidden', paddingBottom: '3px' }}
                >
                  <Grid
                    item
                    style={{ color: '#00000090', overflowWrap: 'break-word' }}
                  >
                    {pdf.name}
                  </Grid>
                  <Grid item style={{ color: '#00000095', marginTop: '10px' }}>
                    Upladed by: {pdf.uploadedBy.split(' ')[0]}
                  </Grid>
                  <Grid item style={{ marginTop: '10px' }}>
                    <Button
                      component={'a'}
                      target="_blank"
                      href={pdf.pdf}
                      variant="contained"
                      color="secondary"
                    >
                      Click here
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Grid>
  );
}
