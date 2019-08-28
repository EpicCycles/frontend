import React from 'react';
import * as PropTypes from 'prop-types';
import { findObjectWithId } from '../../helpers/utils';
import { findPartsForBike } from '../bike/helpers/bike';
import ViewModelBlock from '../app/model/ViewModelBlock';
import QuoteSummaryParts from './QuoteSummaryParts';
import {quoteFieldsBikeComplete} from "../quote/helpers/quoteFields";

const QuoteSummary = props => {
  const {
    showPrices,
    quote,
    quoteParts,
    brands,
    sections,
    parts,
    bikes,
    bikeParts,
    frames,
    customers,
    users,
  } = props;

  return (
    <div className="grid-container">
      <ViewModelBlock
        modelFields={quoteFieldsBikeComplete}
        model={quote}
        bikes={bikes}
        customers={customers}
        frames={frames}
        users={users}
      />
      <QuoteSummaryParts
        lockFirstColumn
        quote={quote}
        showPrices={showPrices}
        quoteParts={quoteParts}
        brands={brands}
        sections={sections}
        parts={parts}
        bikeParts={bikeParts}
      />
    </div>
  );
};

QuoteSummary.propTypes = {
  showPrices: PropTypes.bool,
  customerView: PropTypes.bool,
  quote: PropTypes.object.isRequired,
  quoteParts: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  bikeParts: PropTypes.array.isRequired,
  bikes: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  frames: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default QuoteSummary;
