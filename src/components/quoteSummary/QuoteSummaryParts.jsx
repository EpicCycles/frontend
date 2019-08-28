import React from 'react';
import * as PropTypes from 'prop-types';

import { quoteSummaryFields } from './helpers/quoteSummaryFields';
import { quoteSummaryElements } from './helpers/quoteSummaryElements';
import ModelTable from '../app/model/ModelTable';

const QuoteSummaryParts = props => {
  const {
    showPrices,
    customerView,
    quote,
    quoteParts,
    quoteCharges,
    brands,
    charges,
    sections,
    parts,
    bikeParts,
    lockFirstColumn,
  } = props;
  const summaryFields = quoteSummaryFields(showPrices);
  const summaryData = quoteSummaryElements(
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
  );

  if (summaryData.length === 0) return <div data-test="no-summary">No Quote details</div>;

  return (
      <ModelTable
        viewMode
        modelArray={summaryData}
        modelFields={summaryFields}
        blockIdentity="summary"
        lockFirstColumn={lockFirstColumn}
      />
  );
};
QuoteSummaryParts.defaultProps = {
  charges: [],
  quoteCharges: [],
};
QuoteSummaryParts.propTypes = {
  quote: PropTypes.object.isRequired,
  showPrices: PropTypes.bool,
  customerView: PropTypes.bool,
  lockFirstColumn: PropTypes.bool,
  quoteParts: PropTypes.array.isRequired,
  quoteCharges: PropTypes.array,
  brands: PropTypes.array.isRequired,
  charges: PropTypes.array,
  sections: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  bikeParts: PropTypes.array.isRequired,
};

export default QuoteSummaryParts;
