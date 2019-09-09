const INVALID_PERCENTAGE = 'Percentage values should be between 0.01 and 100';
export const percentageValidator = percentage => {
  if (percentage) {
    const numberValue = parseFloat(String(percentage).trim());
    if (numberValue > 100) return INVALID_PERCENTAGE;
    if (numberValue <= 0) return INVALID_PERCENTAGE;
  }
};
