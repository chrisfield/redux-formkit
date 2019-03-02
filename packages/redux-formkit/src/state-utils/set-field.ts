import toPath from "lodash.topath";

const setFieldWithPath = (state:any, value: any, path: string[], pathIndex:number):any => {
  if (pathIndex >= path.length) {
    return value;
  }

  const first:any = path[pathIndex];
  const firstState:any = state && (Array.isArray(state) ? state[Number(first)] : state[first]);
  const next:any = setFieldWithPath(firstState, value, path, pathIndex + 1);

  if (!state) {
    if (isNaN(first)) {
      return { [first]: next };
    }
    const initialized: any[] = [];
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

const setField = (state:any, field:any, value:any) =>
  setFieldWithPath(state, value, toPath(field), 0);

export default setField;
