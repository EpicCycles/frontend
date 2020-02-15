import { displayForPartType } from '../../quote/helpers/display';
import { findObjectWithId, updateObject } from '../../../helpers/utils';
import { quotePartSummary } from '../../quotePart/helpers/quotePartSummary';
import { chargeName } from '../../charge/helpers/chargeName';

const buildSummaryObject = (
  sectionUsed,
  partTypeUsed,
  quotePart,
  section,
  partType,
  bikePart,
  replacementPart,
  brands,
  parts,
  hidePrices,
) => {
  const priceElements = hidePrices
    ? { trade_in_price: undefined, part_price: undefined, total_price: undefined }
    : {};
  const dummyKey = quotePart
    ? `qp_${quotePart.id}`
    : bikePart
    ? `bp_${bikePart.id}`
    : `pt_${partType.id}`;
  const sectionName = sectionUsed ? '' : section.name;
  const partTypeName = partTypeUsed ? '' : partType.name;
  const part_desc = bikePart
    ? quotePartSummary(bikePart, quotePart, replacementPart, brands)
    : quotePart.part
    ? quotePartSummary(bikePart, quotePart, findObjectWithId(parts, quotePart.part), brands)
    : 'No Part';
  return updateObject(
    quotePart,
    {
      sectionName,
      partTypeName,
      part_desc,
      dummyKey,
    },
    priceElements,
  );
};
export const quoteSummaryElements = (
  quote,
  sections,
  bikeParts,
  quoteParts,
  parts,
  brands,
  quoteCharges,
  charges,
  showPrices,
  customerView,
) => {
  const quotePartsForQuote = quoteParts.filter(qp => qp.quote === quote.id);
  const quoteChargesForQuote = quoteCharges.filter(qp => qp.quote === quote.id);
  let summaryElements = [];
  let fixedElements = [];
  // first show the non fixed elements
  sections.forEach(section => {
    let sectionUsed = false;
    let sectionUsedForFixed = false;
    section.partTypes.forEach(partType => {
      let partTypeUsed = false;
      let partTypeUsedForFixed = false;
      const detailForPartType = displayForPartType(
        partType.id,
        quotePartsForQuote,
        bikeParts,
        parts,
      );
      const { bikePart, quotePart, replacementPart, additionalParts } = detailForPartType;

      if (quotePart) {
        if (customerView && quotePart.fixed_price) {
          fixedElements.push(
            buildSummaryObject(
              sectionUsedForFixed,
              partTypeUsedForFixed,
              quotePart,
              section,
              partType,
              bikePart,
              replacementPart,
              brands,
              parts,
              false,
            ),
          );
          partTypeUsedForFixed = true;
          sectionUsedForFixed = true;
        } else {
          summaryElements.push(
            buildSummaryObject(
              sectionUsed,
              partTypeUsed,
              quotePart,
              section,
              partType,
              bikePart,
              replacementPart,
              brands,
              parts,
              !showPrices,
            ),
          );
          partTypeUsed = true;
          sectionUsed = true;
        }
      } else {
        if (bikePart && (!customerView || partType.customer_visible)) {
          summaryElements.push(
            buildSummaryObject(
              sectionUsed,
              partTypeUsed,
              undefined,
              section,
              partType,
              bikePart,
              undefined,
              brands,
              parts,
            ),
          );
          partTypeUsed = true;
          sectionUsed = true;
        }
      }

      additionalParts.forEach(quotePart => {
        if (customerView && quotePart.fixed_price) {
          fixedElements.push(
            buildSummaryObject(
              sectionUsedForFixed,
              partTypeUsedForFixed,
              quotePart,
              section,
              partType,
              undefined,
              undefined,
              brands,
              parts,
              false,
            ),
          );
          partTypeUsedForFixed = true;
          sectionUsedForFixed = true;
        } else {
          summaryElements.push(
            buildSummaryObject(
              sectionUsed,
              partTypeUsed,
              quotePart,
              section,
              partType,
              undefined,
              undefined,
              brands,
              parts,
              !(showPrices || quotePart.fixed_price),
            ),
          );
          partTypeUsed = true;
          sectionUsed = true;
        }
      });
    });
  });
  if (customerView && fixedElements.length > 0)
    summaryElements.push({ sectionName: 'Itemised changes', dummyKey: 'qp_itemised' });

  let chargesAdded = false;
  quoteChargesForQuote.forEach(quoteCharge => {
    if (quoteCharge.price) {
      if (customerView && !chargesAdded) fixedElements.push({ dummyKey: 'qc_blank' });
      fixedElements.push({
        sectionName: chargesAdded ? '' : 'Additional Costs',
        partTypeName: chargeName(quoteCharge.charge, charges),
        total_price: quoteCharge.price,
        dummyKey: `qc_${quoteCharge.id}`,
      });
      chargesAdded = true;
    }
  });

  return summaryElements.concat(fixedElements);
};
