const fallbackValues = {
  register: {},
  values: {},
  status: {}
};

const getFormState = (state, form) => {
  if (!state.form[form]) {
    return fallbackValues;
  }
  return state.form[form];
};

export default getFormState;
