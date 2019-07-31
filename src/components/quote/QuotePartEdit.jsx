import React from 'react';
import * as PropTypes from 'prop-types';
import { updateObject } from '../../helpers/utils';
import { quotePartChanges } from './helpers/quotePartChanges';
import { quotePartFields } from './helpers/quotePartFields';
import EditModelSimple from '../app/model/EditModelSimple';

class QuotePartEdit extends React.Component {
  additionalProcessingOnChange = validatedQuotePart => {
    const { quotePart, sections, brands, parts, supplierProducts } = this.props;
    return quotePartChanges(
      quotePart,
      validatedQuotePart,
      sections,
      brands,
      parts,
      supplierProducts,
    );
  };

  saveQuotePart = quotePartToSave => {
    let quotePart = updateObject(quotePartToSave);
    const _completePart = quotePart._completePart;

    if (_completePart && !_completePart.id) {
      this.props.saveQuotePart(quotePart, _completePart);
    } else {
      if (_completePart) quotePart.part = _completePart.id;
      this.props.saveQuotePart(quotePart);
    }
  };
  deleteQuotePart = deletionKey => {
    const { persistedQuotePart } = this.props;
    this.props.deleteQuotePart(deletionKey, persistedQuotePart.quote);
  };
  render() {
    const {
      quotePart,
      persistedQuotePart,
      componentKey,
      sections,
      suppliers,
      raiseStateForQuotePart,
      pricesRequired,
    } = this.props;
    const fields = quotePartFields(quotePart, this.additionalProcessingOnChange, pricesRequired);
    const rowClass = quotePart && quotePart.error ? 'error' : '';

    return (
      <div className={`grid-row ${rowClass}`} key={`row${componentKey}`}>
        <EditModelSimple
          model={quotePart}
          persistedModel={persistedQuotePart}
          raiseState={raiseStateForQuotePart}
          modelFields={fields}
          sections={sections}
          suppliers={suppliers}
          actionsRequired
          modelSave={this.saveQuotePart}
          modelDelete={this.deleteQuotePart}
        />
      </div>
    );
  }
}

QuotePartEdit.defaultProps = {};
QuotePartEdit.propTypes = {
  quotePart: PropTypes.object,
  persistedQuotePart: PropTypes.object,
  deleteQuotePart: PropTypes.func.isRequired,
  saveQuotePart: PropTypes.func.isRequired,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sections: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  supplierProducts: PropTypes.array.isRequired,
  raiseStateForQuotePart: PropTypes.func.isRequired,
  pricesRequired: PropTypes.bool,
};
export default QuotePartEdit;
