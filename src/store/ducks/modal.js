/**
 * Types
 */
export const Types = {
  SHOW: 'modal/SHOW',
  HIDE: 'modal/HIDE',
};

/*
Reducers
*/

const INITIAL_STATE = {
  isOpen: false,
  cordinates: null,
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      return {
        isOpen: true,
        cordinates: action.payload.cordinates,
      };
    case Types.HIDE:
      return {
        isOpen: false,
        cordinates: null,
      };
    default:
      return state;
  }
}
/**
 * Actions
 */
export const Creators = {
  showModal: cordinates => ({
    type: Types.SHOW,
    payload: { cordinates },
  }),

  hideModal: () => ({
    type: Types.HIDE,
  }),
};
