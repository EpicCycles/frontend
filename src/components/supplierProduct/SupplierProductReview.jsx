import React, { Fragment, useState } from 'react';
import { removeKey, updateObject, updateObjectInArray } from '../../helpers/utils';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import {
  filterPartsAndProducts,
  supplierProductSearchFields,
} from './helpers/filterPartsAndProducts';
import SupplierProductReviewList from './SupplierProductReviewList';
import EditModelPage from '../app/model/EditModelPage';

const SupplierProductReview = props => {
  const [searchCriteria, setSearchCriteria] = useState({});
  const [updatedParts, setUpdatedParts] = useState([]);
  const [updatedSupplierProducts, setUpdatedSupplierProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const {
    isLoading,
    parts,
    supplierProducts,
    brands,
    suppliers,
    sections,
    users,
    savePart,
    deletePart,
    saveSupplierProduct,
    saveSupplierProductOK,
    deleteSupplierProduct,
  } = props;

  const raiseStateForPart = updatedPart => {
    setUpdatedParts(updateObjectInArray(this.state.updatedParts, updatedPart));
  };
  const raiseStateForSupplierProduct = updatedSupplierProduct => {
    setUpdatedSupplierProducts(
      updateObjectInArray(this.state.updatedSupplierProducts, updatedSupplierProduct),
    );
  };
  const handleInputChange = (fieldName, input) => {
    const inputArrayTest = Array.isArray(input) ? input.length > 1 || !!input[0] : !!input;
    if (inputArrayTest) {
      const updatedSearchCriteria = updateObject(searchCriteria);
      updatedSearchCriteria[fieldName] = input;
      setSearchCriteria(updatedSearchCriteria);
    } else {
      setSearchCriteria(removeKey(searchCriteria, fieldName));
    }
  };

  let partsToUse, supplierProductsToUse;
  const filteredLists = filterPartsAndProducts(searchCriteria, parts, supplierProducts);
  partsToUse = filteredLists.parts;
  supplierProductsToUse = filteredLists.supplierProducts;
  return (
    <Fragment key="productReview">
      <h2>Review Parts</h2>
      {showFilters ? (
        <div className="row full">
          <div>
            <Button onClick={() => setShowFilters(false)}>Hide Filters</Button>
          </div>
          <EditModelPage
            onChange={handleInputChange}
            modelFields={supplierProductSearchFields}
            model={searchCriteria}
            sourceDataArrays={{ sections, suppliers, brands }}
          />
        </div>
      ) : (
        <div className="row full">
          <Button onClick={() => setShowFilters(true)}>Show Filters</Button>
        </div>
      )}
      <SupplierProductReviewList
        parts={partsToUse}
        updatedParts={updatedParts}
        updatedSupplierProducts={updatedSupplierProducts}
        supplierProducts={supplierProductsToUse}
        brands={brands}
        suppliers={suppliers}
        sections={sections}
        users={users}
        savePart={savePart}
        deletePart={deletePart}
        saveSupplierProduct={saveSupplierProduct}
        deleteSupplierProduct={deleteSupplierProduct}
        saveSupplierProductOK={saveSupplierProductOK}
        raiseStateForPart={raiseStateForPart}
        raiseStateForSupplierProduct={raiseStateForSupplierProduct}
      />
      {isLoading && (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )}
    </Fragment>
  );
};

export default SupplierProductReview;
