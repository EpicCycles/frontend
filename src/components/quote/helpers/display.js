import { QUANTITY_FIELD, TRADE_IN_PRICE_FIELD } from '../../app/model/helpers/fields';
import { findObjectWithId } from '../../../helpers/utils';
import { PART_PRICE_FIELD } from '../../quotePart/helpers/quotePartFields';
import { quotePartSummary } from '../../quotePart/helpers/quotePartSummary';
import { toInteger } from '../../app/model/helpers/model';

const findReplacementQuotePart = (partTypeId, bikePart, quoteParts) => {
  if (!bikePart) return undefined;
  return quoteParts.find(qp => qp.partType === partTypeId && !!qp.omit);
};
const findReplacementPart = (quotePart, parts) => {
  if (!quotePart) return undefined;
  if (!quotePart.part) return undefined;
  return findObjectWithId(parts, quotePart.part);
};
export const displayForPartType = (partTypeId, quoteParts, bikeParts, parts) => {
  const bikePart = bikeParts.find(bp => toInteger(bp.partType) === partTypeId);
  const additionalParts = quoteParts.filter(
    qp => toInteger(qp.partType) === partTypeId && !qp.omit,
  );
  const quotePart = findReplacementQuotePart(partTypeId, bikePart, quoteParts);
  const replacementPart = findReplacementPart(quotePart, parts);

  return { bikePart, quotePart, replacementPart, additionalParts };
};
export const displayForPartTypeAndQuote = (quote, partTypeId, bike, parts) => {
  const quoteParts = quote.quoteParts || [];
  const bikeParts = bike ? bike.bikeParts || [] : [];

  return displayForPartType(partTypeId, quoteParts, bikeParts, parts);
};

export const displayQuotePartArray = (
  bikePart,
  quotePart,
  replacementPart,
  additionalParts,
  parts,
  brands,
) => {
  const arrayOfDetails = [];
  if (bikePart) {
    arrayOfDetails.push(quotePartSummary(bikePart, quotePart, replacementPart, brands));
  }
  additionalParts.forEach(additionalQuotePart => {
    arrayOfDetails.push(quotePartSummary(undefined, additionalQuotePart, undefined, brands));
  });
  return arrayOfDetails;
};

export const priceFields = [QUANTITY_FIELD, PART_PRICE_FIELD, TRADE_IN_PRICE_FIELD];
