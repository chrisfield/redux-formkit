import {REGISTER_FIELD, DEREGISTER_FIELD, REGISTER_FIELD_ARRAY, DEREGISTER_FIELD_ARRAY} from '../../actions/types';

export const initialState = {};

const fieldStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_FIELD:
      return {
        ...state,
        [action.field]: {name: action.field, type: 'Field', count:1}
      };
    case DEREGISTER_FIELD: {
      const nextState = {...state};
      delete nextState[action.field];
      return nextState;
    }
    case REGISTER_FIELD_ARRAY:
      return {
        ...state,
        [action.fieldArray]: {name: action.fieldArray, type: 'FieldArray', count:1}
      };
    case DEREGISTER_FIELD_ARRAY: {
      const nextState = {...state};
      delete nextState[action.fieldArray];
      return nextState;
    }
    default:
      return state;
  }
};

export default fieldStatusReducer; 
