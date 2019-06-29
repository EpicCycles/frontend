/* eslint-disable camelcase */
import React from 'react';

import * as PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { brandFields } from '../app/model/helpers/fields';
import { updateObject } from '../../helpers/utils';
import EditModel from '../app/model/EditModel';

class BrandModal extends React.Component {
  state = {
    brand: updateObject(this.props.brand),
    persistedBrand: this.props.brand,
    mode: this.props.brand && this.props.brand.id ? 'Edit' : 'New',
  };

  saveOrCreateBrand = brand => {
    const { saveBrand, closeBrandModal } = this.props;
    saveBrand(brand);
    closeBrandModal();
  };

  deleteOrRemoveBrand = brandId => {
    const { deleteBrand, closeBrandModal } = this.props;
    deleteBrand(brandId);
    closeBrandModal();
  };

  render() {
    const { closeBrandModal, suppliers, brand } = this.props;
    const mode = this.props.brand && this.props.brand.id ? 'Edit' : 'New';
    return (
      <div>
        <div style={{ width: '100%', textAlign: 'right' }}>
          <Icon name="remove" circular link onClick={closeBrandModal} />
        </div>
        <div style={{ width: '100%', textAlign: 'left' }}>
          <h2>{mode} Brand</h2>
          <EditModel
            pageMode
            model={brand}
            modelFields={brandFields}
            suppliers={suppliers}
            modelSave={this.saveOrCreateBrand}
            modelDelete={this.deleteOrRemoveBrand}
            showReadOnlyFields
            actionsRequired
          />
        </div>
      </div>
    );
  }
}
BrandModal.defaultProps = {
  brand: {},
};
BrandModal.propTypes = {
  brand: PropTypes.object.isRequired,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  suppliers: PropTypes.array.isRequired,
  saveBrand: PropTypes.func.isRequired,
  deleteBrand: PropTypes.func.isRequired,
  closeBrandModal: PropTypes.func.isRequired,
};

export default BrandModal;
