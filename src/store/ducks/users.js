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
  error: null,
  message: '',
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_ERROR:
      return { ...state, error: true, loading: false };
    case Types.EXCLUDE:
      return { ...state, data: [state.data.filter(user => user.id !== action.payload.id)] };
    default:
      return state;
  }
}
