import { toPath } from 'lodash'

const getFieldValue = (state, field) => {
  const path = toPath(field)
  const length = path.length
  if (!length) {
    return undefined;
  }

  let result = state;
  for (let i = 0; i < length && result; ++i) {
    result = result[path[i]]
  }
  return result;
}

export default getFieldValue;
