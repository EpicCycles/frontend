import React, { Fragment, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';
import { updateObject } from '../../../helpers/utils';
import { createNewModelInstance, getModelKey } from '../model/helpers/model';
import SupplierEdit from '../../supplier/SupplierEdit';
import SupplierSelect from '../../supplier/SupplierSelect';
import { textToNumber } from '../../../helpers/textToNumber';

const UploadMappingSuppliers = props => {
  const [rowMappings, setRowMappings] = useState(props.rowMappings);
  const [showModal, setShowModal] = useState(false);
  const [supplier, setSupplier] = useState(undefined);

  const { suppliers, saveSupplier, deleteSupplier } = props;
  let updateMappings = false;
  const updatedRowMappings = rowMappings.map(rowMap => {
    if (!(rowMap.supplier || rowMap.ignore)) {
      const matchedSupplier = suppliers.find(
        supplier => supplier.supplier_name.toLowerCase() === rowMap.supplierName.toLowerCase(),
      );
      if (matchedSupplier) {
        updateMappings = true;
        return updateObject(rowMap, { supplier: matchedSupplier.id });
      }
    }
    return rowMap;
  });
  if (updateMappings) setRowMappings(updatedRowMappings);

  const goToNextStep = () => {
    props.addDataAndProceed({ rowMappings });
  };

  const discardData = supplierName => {
    const updatedRowMappings = rowMappings.map(rowMap => {
      if (rowMap.supplierName === supplierName) {
        return updateObject(rowMap, { supplier: undefined, ignore: true });
      }
      return rowMap;
    });
    setRowMappings(updatedRowMappings);
  };

  const undoDiscardData = supplierName => {
    const updatedRowMappings = rowMappings.map(rowMap => {
      if (rowMap.supplierName === supplierName) {
        return updateObject(rowMap, { ignore: false });
      }
      return rowMap;
    });
    setRowMappings(updatedRowMappings);
  };

  const setUpSupplierModalForNewField = supplierName => {
    const supplier = createNewModelInstance({
      supplier_name: supplierName,
    });
    setSupplier(supplier);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSupplier(undefined);
    setShowModal(false);
  };

  const selectSupplier = (value, supplierName) => {
    const updatedRowMappings = rowMappings.map(rowMap => {
      if (rowMap.supplierName === supplierName) {
        return updateObject(rowMap, { supplier: textToNumber(value), ignore: false });
      }
      return rowMap;
    });

    setRowMappings(updatedRowMappings);
  };
  const suppliersUnmatched = [];
  const suppliersDiscarded = [];
  rowMappings.forEach(rowMapping => {
    if (rowMapping.ignore) {
      if (!suppliersDiscarded.some(entry => entry.supplierName === rowMapping.supplierName)) {
        suppliersDiscarded.push(rowMapping);
      }
    } else if (!rowMapping.supplier) {
      if (!suppliersUnmatched.some(entry => entry.supplierName === rowMapping.supplierName)) {
        suppliersUnmatched.push(rowMapping);
      }
    }
  });

  return (
    <Fragment key="supplierUploadMapping">
      <section key="mappingData" className="row" id="mappingData">
        {showModal && (
          <SupplierEdit
            supplier={supplier ? supplier : {}}
            componentKey={getModelKey(supplier)}
            saveSupplier={saveSupplier}
            deleteSupplier={deleteSupplier}
            closeModal={handleCloseModal}
          />
        )}
        {suppliersUnmatched.map(({ supplierName }, index) => (
          <div key={`mapping${index}`} className="rounded" data-test="unmatchedSupplier">
            {supplierName}
            <SupplierSelect
              suppliers={suppliers}
              fieldName={'selectedSupplier'}
              isEmptyAllowed
              onChange={(field, value) => selectSupplier(value, supplierName)}
            />
            <Icon
              id={`delete${index}`}
              name="trash"
              onClick={() => discardData(supplierName)}
              title="Discard data"
            />
            <Icon
              id={`create${index}`}
              name="add circle"
              onClick={() => setUpSupplierModalForNewField(supplierName)}
              title="Create Supplier to store data"
            />
          </div>
        ))}
        {suppliersDiscarded.map(({ supplierName }, index) => (
          <div key={`discard${index}`} className="rounded discarded" data-test="ignoredSupplier">
            {supplierName}
            <Icon
              id={`restore${index}`}
              name="remove circle"
              onClick={() => undoDiscardData(supplierName)}
              title="Do not Discard data"
            />
          </div>
        ))}
      </section>
      <div>
        <Button key="uploadCont" onClick={goToNextStep} disabled={suppliersUnmatched.length > 0}>
          Continue ...
        </Button>
      </div>
    </Fragment>
  );
};

UploadMappingSuppliers.propTypes = {
  rowMappings: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  saveSupplier: PropTypes.func.isRequired,
  deleteSupplier: PropTypes.func,
  addDataAndProceed: PropTypes.func.isRequired,
};
export default UploadMappingSuppliers;
