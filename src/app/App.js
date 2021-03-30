import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import 'react-toastify/dist/ReactToastify.min.css';
import theme from './config/theme/Theme';
import Header from './components/Header/Header';
import { withRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Home from './screens/Home.component';
import Explore from './screens/Explore.component';
import Contact from './screens/Contact.component';
import SemComponent from './screens/SemComponent/Sem.component';
import BranchComponent from './screens/BranchComponent.component';
import Profile from './screens/ProfileComponent/Profile';
import Footer from './screens/Footer.component';
import PrivateRoute from './PrivateRoute';
import PDFComponent from './screens/PDFComponent.component';
import { CircularProgress, Grid } from '@material-ui/core';

function App({ match, location, history }) {
  // console.log(match, location, history);

  const { initialized } = useSelector((state) => state.async);
  const { currentUser } = useSelector((state) => state.auth);

  if (!initialized) {
    return (
      <Grid
        style={{ marginTop: '20px' }}
        container
        direction="column"
        alignItems="center"
      >
        <CircularProgress color="primary" />
        Loading...
      </Grid>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Header activeLink={location.pathname} />
      <Switch>
        {!!currentUser ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Route exact path="/" component={PrivateRoute} />
        )}
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/profile/me" component={Profile} />
        <Route exact path="/explore/:year" component={BranchComponent} />
        <Route exact path="/explore/:year/:branch" component={SemComponent} />
        <Route
          exact
          path="/explore/:year/:branch/:subject"
          component={PDFComponent}
        />
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default withRouter(App);
