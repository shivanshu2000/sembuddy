import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_CURRENT_USER_PROFILE_LOGOUT,
} from './profileConstants';

const initialState = {
  currentUserProfile: null,
};

export default function profileReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };

    case LISTEN_TO_CURRENT_USER_PROFILE_LOGOUT:
      return {
        ...state,
        currentUserProfile: null,
      };

    default:
      return {
        ...state,
      };
  }
}
