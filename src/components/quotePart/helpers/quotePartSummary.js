import { buildPartString } from '../../part/helpers/part';

export const quotePartSummary = (bikePart, quotePart, replacementPart, brands) => {
  if (quotePart) {
    if (replacementPart) {
      const qtyString = !!quotePart.quantity ? ` (qty ${quotePart.quantity})` : '';
      return `**** ${buildPartString(replacementPart, brands)}${qtyString} ****`;
    }
    if (quotePart.not_required) {
      return '**** Not Required ****';
    }
  }
  if (bikePart) {
    return bikePart.partName;
  }
  return 'No Part';
};
