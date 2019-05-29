import {actionTypes} from "../actions";
import setField from "../state-utils/set-field";
import isField from "../state-utils/is-field";

export const initialState = {};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_FORM_STATE:
      return action.formErrors || {};
    case actionTypes.UPDATE_FIELDS:
      return {};
    case actionTypes.START_SUBMIT:
      return {};
    case actionTypes.STOP_SUBMIT:
      return action.formErrors;
    case actionTypes.SET_FIELD_ERROR:
      if (isField(state, action.field)) {
        return setField(state, action.field, undefined);
      } 
      return state;
    default:
      return state;
  }
};

export default errorsReducer;
