import React from 'react';
import * as PropTypes from 'prop-types';
import { partFieldsComplete } from '../app/model/helpers/fields';
import ModelViewRow from '../app/model/ModelViewRow';

const PartViewRow = props => {
  const { part, lockFirstColumn, brands, sections } = props;
  return (
    <ModelViewRow
      modelFields={partFieldsComplete}
      model={part}
      brands={brands}
      sections={sections}
      lockFirstColumn={lockFirstColumn}
    />
  );
};
PartViewRow.propTypes = {
  part: PropTypes.object.isRequired,
  lockFirstColumn: PropTypes.bool,
  sections: PropTypes.any,
  brands: PropTypes.any,
};

export default PartViewRow;
