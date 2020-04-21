import React from 'react';
import SupplierProductHeaders from './SupplierProductHeaders';
import SupplierProductReviewPart from './SupplierProductReviewPart';
import { getModelKey, modelIsAlreadyInArray } from '../app/model/helpers/model';
import { findObjectWithKey } from '../../helpers/utils';
import { partFieldsComplete, supplierProductFields } from '../app/model/helpers/fields';

const SupplierProductReviewList = props => {
  const {
    parts,
    updatedParts,
    supplierProducts,
    updatedSupplierProducts,
    brands,
    suppliers,
    sections,
    users,
    savePart,
    deletePart,
    saveSupplierProduct,
    deleteSupplierProduct,
    saveSupplierProductOK,
    raiseStateForPart,
    raiseStateForSupplierProduct,
  } = props;

  const checkedUpdatedParts = [];
  updatedParts.forEach(updatedPart => {
    if (!modelIsAlreadyInArray(parts, updatedPart, partFieldsComplete))
      checkedUpdatedParts.push(updatedPart);
  });

  const checkedUpdatedSupplierProducts = [];
  updatedSupplierProducts.forEach(updatedSupplierProduct => {
    if (!modelIsAlreadyInArray(supplierProducts, updatedSupplierProduct, supplierProductFields))
      checkedUpdatedSupplierProducts.push(updatedSupplierProduct);
  });
  return (
    <div
      key="partReviewGrid"
      className="grid"
      style={{
        height: window.innerHeight - 100 + 'px',
        width: window.innerWidth - 50 + 'px',
        overflow: 'scroll',
      }}
    >
      <SupplierProductHeaders withActions={true} />
      {parts.map(part => {
        const partKey = getModelKey(part);
        return (
          <SupplierProductReviewPart
            part={part}
            updatedPart={findObjectWithKey(checkedUpdatedParts, partKey)}
            supplierProducts={supplierProducts}
            updatedSupplierProducts={checkedUpdatedSupplierProducts}
            brands={brands}
            suppliers={suppliers}
            sections={sections}
            users={users}
            key={`review_${part.id}`}
            savePart={savePart}
            deletePart={deletePart}
            saveSupplierProduct={saveSupplierProduct}
            deleteSupplierProduct={deleteSupplierProduct}
            saveSupplierProductOK={saveSupplierProductOK}
            raiseStateForPart={raiseStateForPart}
            raiseStateForSupplierProduct={raiseStateForSupplierProduct}
          />
        );
      })}
    </div>
  );
};

export default SupplierProductReviewList;
