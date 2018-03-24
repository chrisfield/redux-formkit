import values from './field/values';
import status from './field/status';
import register from './field/register';
import errors from './field/errors';

export const initialState = {};

const fieldReducer = (state = initialState, action) => (
  {
    register: register(state.register, action),
    values: values(state.values, action),
    status: status(state.status, action),
    errors: errors(state.errors, action)
  }
)

export default fieldReducer;

