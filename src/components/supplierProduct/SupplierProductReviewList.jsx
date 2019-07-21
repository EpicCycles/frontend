import React from 'react';
import SupplierProductHeaders from './SupplierProductHeaders';
import SupplierProductReviewPart from './SupplierProductReviewPart';
import { getModelKey } from '../app/model/helpers/model';
import { findObjectWithKey } from '../../helpers/utils';

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
            updatedPart={findObjectWithKey(updatedParts, partKey)}
            supplierProducts={supplierProducts}
            updatedSupplierProducts={updatedSupplierProducts}
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
