import { updateObject } from '../../../helpers/utils';
import { buildPartString } from '../../part/helpers/part';
import { toInteger } from '../../app/model/helpers/model';

export const getQuoteParts = (quote, sections, bike, parts, brands) => {
  const displayQuoteParts = [];
  const isBike = !!quote.bike;
  const quoteQP = quote.quoteParts ? quote.quoteParts : [];
  const quoteBP = bike ? bike.bikeParts : [];
  sections.forEach(section => {
    section.partTypes.forEach(partType => {
      const partTypeId = partType.id;
      let standardReplacements = { _partType: partType, _isBike: isBike };
      const bikePart = quoteBP.find(bp => bp.partType === partTypeId);
      if (bikePart) {
        const quotePartReplacement = quoteQP.find(qp => qp.omit && qp.partType === partTypeId);
        standardReplacements._bikePart = bikePart;
        if (quotePartReplacement) {
          if (quotePartReplacement.part) {
            const completePart = parts.find(p => p.id === quotePartReplacement.part);
            displayQuoteParts.push(
              updateObject(
                quotePartReplacement,
                {
                  _completePart: completePart,
                  desc: buildPartString(completePart, brands),
                },
                standardReplacements,
              ),
            );
          } else {
            displayQuoteParts.push(
              updateObject(
                quotePartReplacement,
                {
                  desc: quotePartReplacement.desc,
                },
                standardReplacements,
              ),
            );
          }
        } else {
          displayQuoteParts.push(
            updateObject(
              {
                dummyKey: `bikePart_${bikePart.id}`,
                desc: bikePart.desc,
                partType: partTypeId,
              },
              standardReplacements,
            ),
          );
        }
      }
      standardReplacements = { _partType: partType, _isBike: isBike };
      quoteQP
        .filter(qp => !qp.omit && toInteger(qp.partType) === partTypeId)
        .forEach(np => {
          if (np.part) {
            const completePart = parts.find(p => p.id === np.part);
            displayQuoteParts.push(
              updateObject(
                np,
                {
                  _completePart: completePart,
                  desc: buildPartString(completePart, brands),
                },
                standardReplacements,
              ),
            );
          } else {
            displayQuoteParts.push(updateObject(np, standardReplacements));
          }
        });
    });
  });
  quoteQP
    .filter(qp => !qp.partType)
    .forEach(np => {
      displayQuoteParts.push(updateObject(np, { _isBike: isBike }));
    });
  return displayQuoteParts;
};
