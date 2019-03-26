/**
 * Types
 */
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCESS: 'users/ADD_SUCESS',
  ADD_ERROR: 'users/ADD_ERROR',
  EXCLUDE: 'users/EXCLUDE',
};

/*
Reducers
*/
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: false,
  message: '',
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
        message: action.payload.message,
      };
    case Types.ADD_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case Types.EXCLUDE:
      return { ...state, data: [state.data.filter(user => user.id !== action.payload.id)] };
    default:
      return state;
  }
}
/**
 * Actions
 */
export const Creators = {
  addUserRequest: (user, cordinates) => ({
    type: Types.ADD_REQUEST,
    payload: { user, cordinates },
  }),

  addUserSucess: (data, message) => ({
    type: Types.ADD_SUCESS,
    payload: { data, message },
  }),

  addUserError: (error, message) => ({
    type: Types.ADD_ERROR,
    payload: { error, message },
  }),
  excludeUser: id => ({
    type: Types.EXCLUDE,
    payload: { id },
  }),
};
