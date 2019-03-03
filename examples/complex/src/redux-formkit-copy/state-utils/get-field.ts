import toPath from "lodash.topath";

const getField = (state:any, field:string) => {
  const path = toPath(field);
  const length = path.length;
  if (!length) {
    return undefined;
  }

  let result = state;
  for (let i = 0; i < length && result; ++i) {
    result = result[path[i]];
  }
  return result;
};

export default getField;
