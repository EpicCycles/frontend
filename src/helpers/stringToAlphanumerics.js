const regex = /[^\w]/g;
export const stringToAlphanumeric = textValue => {
  return textValue.replace(regex, '');
};
