import { toPath } from 'lodash'

const getFieldValue = (state, field, format) => {
  if (!state) {
    return state
  }

  const path = toPath(field)
  const length = path.length
  if (!length) {
    return undefined
  }

  let result = state
  for (let i = 0; i < length && result; ++i) {
    result = result[path[i]]
  }

  if (format) {
    return format(result);
  }

  return result
}

export default getFieldValue;
