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

export const getNextCursorPosition = field => ({cursorPosition: field.elementRef.selectionStart});

export const getNextCursorPositionNum = ({ elementRef }, value, nextValue) => {
  let cursorPosition = elementRef.selectionStart;
  if (nextValue.length === value.length + 2) { // + 2 is for digit and comma
    cursorPosition++;
  }
  return {cursorPosition};
}

export const setCursorPosition = ({customProps: {cursorPosition}, elementRef}) => {
  if (cursorPosition !== undefined && elementRef.setSelectionRange) {
    elementRef.setSelectionRange(cursorPosition, cursorPosition);
  }  
}
