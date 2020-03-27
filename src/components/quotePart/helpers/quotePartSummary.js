import { buildPartString } from '../../part/helpers/part';

export const quotePartSummary = (bikePart, quotePart, replacementPart, brands) => {
  if (quotePart) {
    if (replacementPart || quotePart.desc) {
      const qtyString = !!quotePart.qty ? ` (qty ${quotePart.qty})` : '';
      if (quotePart.desc) {
        return `**** ${quotePart.desc}${qtyString} ****`;
      }
      return `**** ${buildPartString(replacementPart, brands)}${qtyString} ****`;
    }
    if (quotePart.omit) {
      return '**** Not Required ****';
    }
  }
  if (bikePart) {
    return bikePart.partName;
  }
  return 'No Part';
};
