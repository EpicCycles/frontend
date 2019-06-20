import React from 'react';
import { quoteActions } from './helpers/quote';
import * as PropTypes from 'prop-types';
import { getModelKey } from '../app/model/helpers/model';
import IconArray from '../../common/IconArray';

const QuoteActionCell = props => {
  const {
    archiveQuote,
    changeQuote,
    getQuote,
    quote,
    cloneQuote,
    issueQuote,
    unarchiveQuote,
    actionsDisabled,
  } = props;
  const availableActions = {
    archiveQuote,
    changeQuote,
    getQuote,
    cloneQuote,
    issueQuote,
    unarchiveQuote,
  };
  const componentKey = getModelKey(quote);
  const actionArray = quoteActions(quote, availableActions);
  return (
    <div className="align_center fit-content">
      <IconArray
        componentKey={componentKey}
        actionsDisabled={actionsDisabled}
        actionArray={actionArray}
      />
    </div>
  );
};
QuoteActionCell.propTypes = {
  quote: PropTypes.object.isRequired,
  changeQuote: PropTypes.func,
  getQuote: PropTypes.func,
  archiveQuote: PropTypes.func,
  cloneQuote: PropTypes.func,
  issueQuote: PropTypes.func,
  unarchiveQuote: PropTypes.func,
  actionsDisabled: PropTypes.bool,
};
export default QuoteActionCell;
