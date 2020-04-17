const regex = /[^\d.]/g;
export const textToNumber = textValue => {
  const textValueCleaned = textValue.toString().replace(regex, '');
  if (textValueCleaned.length > 0) {
    const numberValue = Number(textValueCleaned);
    if (!isNaN(numberValue)) return numberValue;
  }
};
