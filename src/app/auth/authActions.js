import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../config/firebase';
import { APP_LOADED } from '../async/asyncReducer';
import { listenToCurrentUserProfileLogout } from '../screens/ProfileComponent/profileActions';
export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOutUser());
        dispatch(listenToCurrentUserProfileLogout());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
