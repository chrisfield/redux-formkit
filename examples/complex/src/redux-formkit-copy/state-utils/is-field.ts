import toPath from "lodash.topath";

const isField = (state:any, field:string) => {
  const path = toPath(field);
  const length = path.length;
  if (!length) {
    return false;
  }

  let result = state;
  let i: number;
  for (i = 0; i < length && result; ++i) {
    result = result[path[i]];
  }
  return (i === length) ? {value: result} : false;
};

export default isField;
