import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_CURRENT_USER_PROFILE_LOGOUT,
} from './profileConstants';

export function listenToCurrentUserProfile(profile) {
  return { type: LISTEN_TO_CURRENT_USER_PROFILE, payload: profile };
}

// export async function listenToCurrentUserProfileLogout() {
//   return { type: LISTEN_TO_CURRENT_USER_PROFILE_LOGOUT };
// }

export function listenToCurrentUserProfileLogout(postId) {
  return function (dispatch) {
    return dispatch({
      type: LISTEN_TO_CURRENT_USER_PROFILE_LOGOUT,
    });
  };
}
