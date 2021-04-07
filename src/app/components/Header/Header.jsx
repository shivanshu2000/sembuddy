import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  AppBar,
  Button,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
} from '@material-ui/core';

import Hidden from '@material-ui/core/Hidden';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { signOutFirebase } from '../../firestore/firebaseService';
import { listenToCurrentUserProfileLogout } from '../../screens/ProfileComponent/profileActions';

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },

  toolBar: {
    backgroundColor: theme.palette.secondary.main,
    color: 'black',
  },
  tabLine: {
    height: '5px',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    width: '250px',

    [theme.breakpoints.down('xs')]: {
      width: '150px',
    },
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '20px',
    marginRight: '20px',
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Header({ activeLink }) {
  const classes = useStyles();

  const history = useHistory();

  const { currentUser } = useSelector((state) => state.auth);

  const { authenticated } = useSelector((state) => state.auth);

  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    switch (activeLink) {
      case '/': {
        setValue(0);
        break;
      }

      case '/explore': {
        setValue(1);
        break;
      }

      case '/explore/:year': {
        setValue(1);
        break;
      }

      case '/contact': {
        setValue(2);
        break;
      }

      case '/profile/me': {
        setValue(false);
        break;
      }

      default: {
        if (
          activeLink === '/explore/1st' ||
          '/explore/2nd' ||
          '/explore/3rd' ||
          '/explore/4th' ||
          '/explore/5th'
        ) {
          setValue(1);
          break;
        } else {
          setValue(false);
          break;
        }
      }
    }
  }, [activeLink]);

  async function handleLogout() {
    try {
      await signOutFirebase();
      await listenToCurrentUserProfileLogout();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const routes = [
    { name: 'Home', link: '/' },
    {
      name: 'Explore',
      link: '/explore',
    },

    { name: 'Contact Us', link: '/contact' },
  ];
  const tabs = (
    <>
      <Tabs
        // onChange={handleChange}
        value={value}
        className={classes.tabContainer}
        indicatorColor="primary"
        classes={{ indicator: classes.tabLine }}
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            disableRipple
          />
        ))}
      </Tabs>

      {currentUser && (
        <Button
          style={{ marginRight: '10px' }}
          color="primary"
          variant="contained"
          onClick={handleLogout}
        >
          Sign out
        </Button>
      )}
    </>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route, index) => (
            <ListItem
              divider
              key={`${route.link}${index}`}
              button
              component={Link}
              to={route.link}
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}

          {authenticated && (
            <ListItem
              component={Button}
              style={{ marginTop: '4px', padding: '10px' }}
              color="primary"
              variant="contained"
              onClick={() => {
                handleLogout();
                setOpenDrawer(false);
              }}
            >
              Sign out
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <div style={{ height: '3px', zIndex: 1350, backgroundColor: 'black' }}>
        {loading && !!currentUser && (
          <LinearProgress color="primary" style={{ zIndex: 1310 }} />
        )}
      </div>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar disableGutters className={classes.toolBar}>
          <Hidden smDown>{tabs}</Hidden>
          {matchesSm && drawer}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}
