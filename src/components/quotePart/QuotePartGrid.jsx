import React from 'react';
import * as PropTypes from 'prop-types';

import { getModelKey } from '../app/model/helpers/model';
import QuotePartEdit from './QuotePartEdit';
import PartDataListComplete from '../part/PartDataListComplete';
import { QUOTE_PART_FOR_BIKE, QUOTE_PART_NON_BIKE } from './helpers/quotePartFields';
import { findObjectWithKey } from '../../helpers/utils';
import ModelTableHeaderRow from '../app/model/ModelTableHeaderRow';

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
    pricesRequired,
  } = props;
  const baseModelFields = isBike ? QUOTE_PART_FOR_BIKE : QUOTE_PART_NON_BIKE;
  return (
    <div className="grid-container">
      <div className="grid">
        <ModelTableHeaderRow
          modelFields={baseModelFields}
          lockFirstColumn
          includeActions
        />

        {quoteParts.map(quotePart => {
          const rowKey = getModelKey(quotePart);
          const updatedQuotePart = findObjectWithKey(updatedQuoteParts, rowKey);
          return (
            <QuotePartEdit
              modelFields={baseModelFields}
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
              pricesRequired={pricesRequired}
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
  pricesRequired: PropTypes.bool,
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
