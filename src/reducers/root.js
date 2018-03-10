import form from './form';

export const initialState = {};

const rootReducer = (state = initialState, action) => (
  {
    form: form(state.form, action)
  }
)

export default rootReducer;
