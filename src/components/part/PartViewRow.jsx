import React from 'react';
import * as PropTypes from 'prop-types';
import { partFieldsComplete } from '../app/model/helpers/fields';
import ModelViewRow from '../app/model/ModelViewRow';

const PartViewRow = props => {
  const { part, supplierProducts, lockFirstColumn, brands, sections } = props;
  const rowSpan = supplierProducts ? supplierProducts.length : 1;
  return (
    <ModelViewRow
      modelFields={partFieldsComplete}
      model={part}
      brands={brands}
      sections={sections}
      lockFirstColumn={lockFirstColumn}
      rowSpan={rowSpan}
    />
  );
};
PartViewRow.propTypes = {
  part: PropTypes.object.isRequired,
  supplierProducts: PropTypes.array,
  lockFirstColumn: PropTypes.bool,
  sections: PropTypes.any,
  brands: PropTypes.any,
};

export default PartViewRow;
