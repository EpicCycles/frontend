import React from 'react';
import * as PropTypes from 'prop-types';

import BrandSelect from './BrandSelect';
import { findObjectWithId } from '../../helpers/utils';

class BrandPromptPart extends React.Component {
  state = { showModal: false };

  selectBrand = (fieldName,  brandId) => {
    const { brands, partDescription } = this.props;
    const brand = findObjectWithId(brands, brandId);

    this.props.addBrandToPart(partDescription, brand.brand_name);
  };

  render() {
    const { brands, partDescription, addBrandToPart } = this.props;
    return (
      <div className="grid-row">
        <div className="grid-item--borderless">{partDescription}</div>
        {addBrandToPart && (
          <div className="grid-item--borderless">
            <BrandSelect brands={brands} isEmptyAllowed={true} onChange={this.selectBrand} />
          </div>
        )}
      </div>
    );
  }
}
BrandPromptPart.propTypes = {
  brands: PropTypes.array.isRequired,
  partDescription: PropTypes.string.isRequired,
  addBrandToPart: PropTypes.func,
};
export default BrandPromptPart;
