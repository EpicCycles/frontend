import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { gridItemClass } from '../app/model/helpers/display';
import { displayForPartTypeAndQuote, displayQuotePartArray } from './helpers/display';
import DisplayBlock from '../../common/DisplayBlock';

const Quotebikes = props => {
  const { quotes, bikes, parts, brands, sections } = props;
  return (
    <Fragment>
      {sections.map(section => {
        return section.partTypes.map(partType => {
          return (
            <div className="grid-row  grid-row--shaded" key={`partType_row_${partType.id}`}>
              <div className={gridItemClass('', 0, true)} data-test="part-type-cell">
                {partType.name}
              </div>
              {quotes.map(quote => {
                const displayData = displayForPartTypeAndQuote(quote, partType.id, bikes, parts);
                const displayArray = displayQuotePartArray(
                  displayData.bikePart,
                  displayData.quotePart,
                  displayData.replacementPart,
                  displayData.additionalParts,
                  parts,
                  brands,
                );
                return (
                  <div
                    className={gridItemClass('', 1, true)}
                    data-test="quote-partType"
                    key={`parts_${partType.id}_${quote.id}`}
                  >
                    <DisplayBlock arrayOfThings={displayArray} />
                  </div>
                );
              })}
            </div>
          );
        });
      })}
    </Fragment>
  );
};

Quotebikes.propTypes = {
  quotes: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  bikes: PropTypes.array.isRequired,
};

export default Quotebikes;
