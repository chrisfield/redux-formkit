import getFieldValue from './getFieldValue';

const initialFieldStatus = {touched: false}

const getFieldStatus = (state, field) => (
  getFieldValue(state, field) || initialFieldStatus
);

export default getFieldStatus;
