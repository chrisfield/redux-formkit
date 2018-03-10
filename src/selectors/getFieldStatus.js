const getFieldStatus = (state, form, model) => (
  state.form[form].status[model]
);

export default getFieldStatus;
