import React from 'react';
import * as PropTypes from 'prop-types';
import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteSummaryParts from './QuoteSummaryParts';
import { quoteFields } from '../quote/helpers/quoteFields';
import { findObjectWithId } from '../../helpers/utils';

const QuoteSummary = props => {
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
    bikes,
    frames,
    customers,
    fittings,
    users,
  } = props;
  const bike = findObjectWithId(bikes, quote.bike);

  return (
    <div className="grid-container">
      <ViewModelBlock
        modelFields={quoteFields({
          quote,
          pricesRequired: customerView,
          fieldExclusions: {
            customer: customerView,
            history: customerView,
            status: customerView,
            epic: customerView,
          },
        })}
        model={quote}
        sourceDataArrays={{ bikes, customers, frames, users, fittings }}
      />
      <QuoteSummaryParts
        lockFirstColumn
        quote={quote}
        showPrices={showPrices}
        customerView={customerView}
        quoteParts={quoteParts}
        quoteCharges={quoteCharges}
        brands={brands}
        charges={charges}
        sections={sections}
        parts={parts}
        bikeParts={bike && bike.bikeParts}
      />
    </div>
  );
};
QuoteSummary.defaultProps = {
  quoteCharges: [],
  charges: [],
  fittings: [],
};
QuoteSummary.propTypes = {
  showPrices: PropTypes.bool,
  customerView: PropTypes.bool,
  quote: PropTypes.object.isRequired,
  quoteParts: PropTypes.array.isRequired,
  quoteCharges: PropTypes.array,
  brands: PropTypes.array.isRequired,
  charges: PropTypes.array,
  sections: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  bikes: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  fittings: PropTypes.array,
  frames: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default QuoteSummary;
