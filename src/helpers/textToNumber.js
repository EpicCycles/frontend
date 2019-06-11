const regex = /[^\d\.]/g;
export const textToNumber = textValue => {
  const textValueCleaned = textValue.replace(regex, '');
  if (textValueCleaned.length > 0) {
    const numberValue = new Number(textValueCleaned);
    if (!isNaN(numberValue)) return numberValue;
  }
};
