import { updateObject } from '../../../helpers/utils';
import { buildPartString } from '../../part/helpers/part';
import { findPartsForBikeId } from '../../bike/helpers/bike';

export const getQuoteParts = (quote, sections, quoteParts, bikeParts, parts, brands) => {
  const displayQuoteParts = [];
  const isBike = !!quote.bike;
  const quoteQP = quoteParts.filter(qp => qp.quote === quote.id);
  const quoteBP = isBike ? findPartsForBikeId(quote.bike, bikeParts, parts) : [];
  const basicQuotePart = { quote: quote.id, _isBike: isBike };
  sections.forEach(section => {
    section.partTypes.forEach(partType => {
      const partTypeId = partType.id;
      const bikePart = quoteBP.find(bp => bp.partType === partTypeId);
      if (bikePart) {
        const quotePartReplacement = quoteQP.find(
          qp => qp.not_required && qp.partType === partTypeId,
        );
        if (quotePartReplacement) {
          if (quotePartReplacement.part) {
            const completePart = parts.find(p => p.id === quotePartReplacement.part);
            displayQuoteParts.push(
              updateObject(basicQuotePart, quotePartReplacement, {
                _bikePart: bikePart,
                _completePart: completePart,
                _partType: partType,
                part_desc: buildPartString(completePart, brands),
              }),
            );
          } else {
            displayQuoteParts.push(
              updateObject(basicQuotePart, quotePartReplacement, {
                _partType: partType,
                _bikePart: bikePart,
              }),
            );
          }
        } else {
          displayQuoteParts.push(
            updateObject(basicQuotePart, {
              dummyKey: `bikePart_${bikePart.id}`,
              partType: partTypeId,
              _bikePart: bikePart,
              _partType: partType,
            }),
          );
        }
      }
      quoteQP
        .filter(qp => !qp.not_required && qp.partType === partTypeId)
        .forEach(np => {
          if (np.part) {
            const completePart = parts.find(p => p.id === np.part);
            displayQuoteParts.push(
              updateObject(basicQuotePart, np, {
                _completePart: completePart,
                _partType: partType,
                part_desc: buildPartString(completePart, brands),
              }),
            );
          } else {
            displayQuoteParts.push(
              updateObject(basicQuotePart, np, {
                _partType: partType,
              }),
            );
          }
        });
    });
  });
  quoteQP
    .filter(qp => !qp.partType)
    .forEach(np => {
      displayQuoteParts.push(updateObject(basicQuotePart, np));
    });
  return displayQuoteParts;
};
