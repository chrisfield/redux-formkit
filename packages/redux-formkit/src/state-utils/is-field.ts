import toPath from "lodash.topath";

const isField = (state, field) => {
  const path = toPath(field);
  const length = path.length;
  if (!length) {
    return false;
  }

  let result = state;
  let i;
  for (i = 0; i < length && result; ++i) {
    result = result[path[i]];
  }
  return (i === length) ? {value: result} : false;
};

export default isField;
