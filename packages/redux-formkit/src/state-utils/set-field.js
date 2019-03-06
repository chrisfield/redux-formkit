import toPath from "lodash.topath";

const setFieldWithPath = (state, value, path, pathIndex) => {
  if (pathIndex >= path.length) {
    return value;
  }

  const first = path[pathIndex];
  const firstState = state && (Array.isArray(state) ? state[Number(first)] : state[first]);
  const next = setFieldWithPath(firstState, value, path, pathIndex + 1);

  if (!state) {
    if (isNaN(first)) {
      return { [first]: next };
    }
    const initialized = [];
    initialized[parseInt(first, 10)] = next;
    return initialized;
  }

  if (Array.isArray(state)) {
    const copy = state.slice();
    copy[parseInt(first, 10)] = next;
    return copy;
  }

  return {
    ...state,
    [first]: next,
  };
};

const setField = (state, field, value) =>
  setFieldWithPath(state, value, toPath(field), 0);

export default setField;