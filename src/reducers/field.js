import value from './field/value';
import status from './field/status';
import register from './field/register';
import error from './field/error';

export const initialState = {};

const fieldReducer = (state = initialState, action) => (
  {
    register: register(state.register, action),
    value: value(state.value, action),
    status: status(state.status, action),
    error: error(state.error, action)
  }
)

export default fieldReducer;

