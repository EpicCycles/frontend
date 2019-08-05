/* eslint-disable react/destructuring-assignment */
import React from 'react';
import * as PropTypes from 'prop-types';
import ModelTableHeaders from './ModelTableHeaders';
import AdditionalHeader from './AdditionalHeader';

const ModelTableHeaderRow = props => (
  <div className="grid-row grid-row--header " key={`${props.blockIdentity}header-row`}>
    <ModelTableHeaders
      modelFields={props.modelFields}
      lockFirstColumn={props.lockFirstColumn}
      className={props.className}
      data-test={`${props.blockIdentity}headers`}
      key={`${props.blockIdentity}headers`}
    />
    {props.includeActions && (
      <AdditionalHeader
        className={props.className}
        key={`${props.blockIdentity}header-actions`}
        data-test={`${props.blockIdentity}actions`}
        headerText={'Actions'}
      />
    )}
    {props.showErrors && (
      <AdditionalHeader
        data-test={`${props.blockIdentity}errors`}
        key={`${props.blockIdentity}header-errors`}
        className={props.className}
        headerText={'Errors'}
      />
    )}
  </div>
);

ModelTableHeaderRow.defaultProps = {
  className: '',
  blockIdentity: '',
};
ModelTableHeaderRow.propTypes = {
  modelFields: PropTypes.array.isRequired,
  className: PropTypes.string,
  blockIdentity: PropTypes.string,
  lockFirstColumn: PropTypes.bool,
  showErrors: PropTypes.bool,
  includeActions: PropTypes.bool,
};
export default ModelTableHeaderRow;
