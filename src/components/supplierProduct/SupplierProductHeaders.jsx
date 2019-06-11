import React from 'react';
import * as PropTypes from 'prop-types';

import { partFieldsComplete, supplierProductFields } from '../app/model/helpers/fields';
import ModelTableHeaders from '../app/model/ModelTableHeaders';
import AdditionalHeader from '../app/model/AdditionalHeader';

const SupplierProductHeaders = (props) => {
  const { withActions } = props;
  return (
    <div className="grid-row grid-row--header ">
      <ModelTableHeaders modelFields={partFieldsComplete} lockFirstColumn={true} />
      {withActions && <AdditionalHeader headerText="Action" />}
      <ModelTableHeaders modelFields={supplierProductFields} />
      {withActions &&<AdditionalHeader headerText="Action" />}
    </div>
  );
};
SupplierProductHeaders.propTypes = {
  withActions: PropTypes.bool,
};
export default SupplierProductHeaders;
