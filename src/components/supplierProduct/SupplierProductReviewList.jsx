import React from 'react';
import SupplierProductHeaders from './SupplierProductHeaders';
import SupplierProductReviewPart from './SupplierProductReviewPart';

const SupplierProductReviewList = props => {
  const {
    parts,
    supplierProducts,
    brands,
    suppliers,
    sections,
    savePart,
    deletePart,
    saveSupplierProduct,
    deleteSupplierProduct,
    saveSupplierProductOK,
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
        return (
          <SupplierProductReviewPart
            part={part}
            supplierProducts={supplierProducts}
            brands={brands}
            suppliers={suppliers}
            sections={sections}
            key={`review_${part.id}`}
            savePart={savePart}
            deletePart={deletePart}
            saveSupplierProduct={saveSupplierProduct}
            deleteSupplierProduct={deleteSupplierProduct}
            saveSupplierProductOK={saveSupplierProductOK}
          />
        );
      })}
    </div>
  );
};

export default SupplierProductReviewList;
