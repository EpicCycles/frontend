import React from 'react';
import * as PropTypes from 'prop-types';

import { getModelKey } from '../app/model/helpers/model';
import QuotePartEdit from './QuotePartEdit';
import ModelTableHeaders from '../app/model/ModelTableHeaders';
import ModelTableActionHeader from '../app/model/ModelTableActionHeader';
import PartDataListComplete from '../part/PartDataListComplete';
import { QUOTE_PART_FOR_BIKE, QUOTE_PART_NON_BIKE } from './helpers/quotePartFields';
import { findObjectWithKey } from '../../helpers/utils';

const QuotePartGrid = props => {
  const {
    isBike,
    quoteParts,
    updatedQuoteParts,
    brands,
    suppliers,
    sections,
    parts,
    supplierProducts,
    deleteQuotePart,
    saveQuotePart,
    raiseStateForQuotePart,
  } = props;
  return (
    <div className="grid-container">
      <div className="grid">
        <div key="bikeReviewHeaders" className="grid-row grid-row--header">
          <ModelTableHeaders
            modelFields={isBike ? QUOTE_PART_FOR_BIKE : QUOTE_PART_NON_BIKE}
            lockFirstColumn={true}
          />

          <ModelTableActionHeader />
        </div>
        {quoteParts.map(quotePart => {
          const rowKey = getModelKey(quotePart);
          const updatedQuotePart = findObjectWithKey(updatedQuoteParts, rowKey);
          return (
            <QuotePartEdit
              quotePart={updatedQuotePart ? updatedQuotePart : quotePart}
              persistedQuotePart={quotePart}
              deleteQuotePart={deleteQuotePart}
              saveQuotePart={saveQuotePart}
              componentKey={rowKey}
              sections={sections}
              brands={brands}
              suppliers={suppliers}
              parts={parts}
              supplierProducts={supplierProducts}
              key={rowKey}
              raiseStateForQuotePart={raiseStateForQuotePart}
            />
          );
        })}
      </div>
      <PartDataListComplete sections={sections} parts={parts} brands={brands} />
    </div>
  );
};
QuotePartGrid.propTypes = {
  isBike: PropTypes.bool,
  quoteParts: PropTypes.array.isRequired,
  updatedQuoteParts: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  supplierProducts: PropTypes.array.isRequired,
  deleteQuotePart: PropTypes.func.isRequired,
  saveQuotePart: PropTypes.func.isRequired,
  raiseStateForQuotePart: PropTypes.func.isRequired,
};

export default QuotePartGrid;
