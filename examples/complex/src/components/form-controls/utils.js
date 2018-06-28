export const upper = value => ((value && value.toUpperCase())||'');
export const lower = value => ((value && value.toLowerCase())||'');
export const number = str => parseInt(str.replace(/[^\d.-]/g, ""), 10);

export const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};

export const maxLength = length => (
  value => (value && value.trim && value.trim().length > length ? 'maxLength': undefined)
);

export const requiredStr = value => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'required'
};

export const requiredNum = value => {
  if (value === null || isNaN(value)) {
    return 'required';
  }
  return undefined;
};
