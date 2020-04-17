import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { supplierFields } from '../app/model/helpers/fields';
import * as PropTypes from 'prop-types';
import { getBrandsForSupplier } from './helpers/supplier';
import EditModel from '../app/model/EditModel';
import { getModelKey } from '../app/model/helpers/model';

const SupplierEdit = props => {
  const { closeModal, brands, supplier } = props;

  const saveOrCreateSupplier = supplier => {
    props.saveSupplier(supplier);
    if (closeModal) {
      closeModal();
    }
  };
  const deleteOrRemoveSupplier = supplierId => {
    if (supplierId) {
      props.deleteSupplier(supplierId);
    }
    if (closeModal) {
      closeModal();
    }
  };

  const componentKey = getModelKey(supplier);
  const brandNames = getBrandsForSupplier(componentKey, brands);
  return (
    <Fragment>
      {closeModal && (
        <div style={{ width: '100%', textAlign: 'right' }}>
          <Icon name="remove" circular link onClick={closeModal} />
        </div>
      )}
      <div style={{ width: '100%', textAlign: 'left' }}>
        <h2>{supplier && supplier.id ? 'Edit' : 'Add'} Supplier</h2>
        <EditModel
          model={supplier}
          modelFields={supplierFields}
          showReadOnlyFields
          actionsRequired
          pageMode
          modelSave={saveOrCreateSupplier}
          modelDelete={deleteOrRemoveSupplier}
        />
        <div key={`supplierBrands${componentKey}`}>Brands: {brandNames.join(', ')}</div>
      </div>
    </Fragment>
  );
};
SupplierEdit.defaultProps = {
  brands: [],
  supplier: {},
};
SupplierEdit.propTypes = {
  brands: PropTypes.array,
  supplier: PropTypes.object,
  componentKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteSupplier: PropTypes.func,
  saveSupplier: PropTypes.func,
  closeModal: PropTypes.func,
};
export default SupplierEdit;
