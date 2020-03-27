import React from 'react';
import * as PropTypes from 'prop-types';
import { quotePartChanges } from './helpers/quotePartChanges';
import { quotePartFields } from './helpers/quotePartFields';
import EditModelSimple from '../app/model/EditModelSimple';

const QuotePartEdit = props => {
  const {
    modelFields,
    quotePart,
    persistedQuotePart,
    componentKey,
    sections,
    suppliers,
    raiseStateForQuotePart,
    pricesRequired,
    brands,
    parts,
    supplierProducts,
    saveQuotePart,
    deleteQuotePart,
  } = props;

  const additionalProcessingOnChange = validatedQuotePart => {
    return quotePartChanges(
      quotePart,
      validatedQuotePart,
      sections,
      brands,
      parts,
      supplierProducts,
    );
  };

  const fields = quotePartFields(modelFields, quotePart, additionalProcessingOnChange, pricesRequired);
  const rowClass = quotePart && quotePart.error ? 'error' : '';

  return (
    <div className={`grid-row ${rowClass}`} key={`row${componentKey}`}>
      <EditModelSimple
        model={quotePart}
        persistedModel={persistedQuotePart}
        raiseState={raiseStateForQuotePart}
        modelFields={fields}
        sourceDataArrays={{ sections, suppliers }}
        actionsRequired
        showReadOnlyFields
        modelSave={saveQuotePart}
        modelDelete={deleteQuotePart}
      />
    </div>
  );
};

QuotePartEdit.defaultProps = {};
QuotePartEdit.propTypes = {
  modelFields: PropTypes.array.isRequired,
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
