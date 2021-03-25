import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import React from 'react';
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
    },
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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

  const filter = match.params.subject.split('-').join(' ');
  console.log(filter);

  const { pdfs } = useSelector((state) => state.pdf);
  const { authenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useFirestoreCollection({
    query: () => listenToEventFromFirestore(filter),
    data: (events) => dispatch(listenToPdfs(events)),
    deps: [dispatch],
  });

  console.log(match.params, history);

  return (
    <Grid container direction="column" style={{ marginBottom: '140px' }}>
      {!authenticated && <PrivateRoute />}
      <Grid item container justify="center">
        <Typography
          // component={'h1'}
          variant="h4"
          align="center"
          style={{
            border: '1px solid #FFC10780',
            backgroundColor: '#FFC10750',
            borderRadius: '10px',
            padding: 10,
            marginTop: '-25px',
          }}
        >
          {filter}
        </Typography>
      </Grid>
      {pdfs.length === 0 && (
        <Grid item style={{ marginLeft: '25px', marginTop: '25px' }}>
          No pdf uploaded for {filter}
        </Grid>
      )}
      <Grid item container style={{ padding: '20px' }}>
        {pdfs.map((pdf) => (
          <Grid
            item
            container
            // direction="column"
            key={`${pdf.id}`}
            xs={12}
            sm={7}
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

            <Grid item xs={10} className={classes.responsiveMargin}>
              <Grid item container direction="column">
                <Grid item style={{ color: '#00000090' }}>
                  {pdf.name}
                </Grid>
                <Grid item style={{ color: '#00000095', marginTop: '10px' }}>
                  Given by: {pdf.givenBy}
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                  <Button
                    component={'a'}
                    target="_blank"
                    href={pdf.pdf}
                    variant="contained"
                    color="secondary"
                  >
                    View Pdf
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
