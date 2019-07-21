import React, { Fragment } from 'react';
import {
  doWeHaveObjects,
  removeItemFromArray,
  removeKey,
  updateObject,
  updateObjectInArray,
} from '../../helpers/utils';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import SupplierProductReviewListSelection from './SupplierProductReviewListSelection';
import { filterPartsAndProducts } from './helpers/filterPartsAndProducts';
import SupplierProductReviewList from './SupplierProductReviewList';
import { supplierProductSearchFields } from './helpers/search';
import { getModelKey, modelIsAlreadyInArray } from '../app/model/helpers/model';
import { partFieldsComplete, supplierProductFields } from '../app/model/helpers/fields';

const initialState = { listParts: false, updatedParts: [], updatedSupplierProducts: [] };
class SupplierProductReview extends React.Component {
  state = updateObject(initialState, {
    searchFields: supplierProductSearchFields(
      this.props.sections,
      this.props.brands,
      this.props.suppliers,
    ),
  });
  static getDerivedStateFromProps(props, state) {
    const { updatedParts, updatedSupplierProducts } = state;
    const { parts, supplierProducts } = props;

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
    return {
      updatedParts: checkedUpdatedParts,
      updatedSupplierProducts: checkedUpdatedSupplierProducts,
    };
  }
  raiseStateForPart = updatedPart => {
    const { parts } = this.props;

    if (modelIsAlreadyInArray(parts, updatedPart, partFieldsComplete)) {
      const updatedParts = removeItemFromArray(this.state.updatedParts, getModelKey(updatedPart));
      this.setState({ updatedParts });
    } else {
      const updatedParts = updateObjectInArray(this.state.updatedParts, updatedPart);
      this.setState({ updatedParts });
    }
  };
  raiseStateForSupplierProduct = updatedSupplierProduct => {
    const { supplierProducts } = this.props;

    if (modelIsAlreadyInArray(supplierProducts, updatedSupplierProduct, supplierProductFields)) {
      const updatedSupplierProducts = removeItemFromArray(
        this.state.updatedSupplierProducts,
        getModelKey(updatedSupplierProduct),
      );
      this.setState({ updatedSupplierProducts });
    } else {
      const updatedSupplierProducts = updateObjectInArray(
        this.state.updatedSupplierProducts,
        updatedSupplierProduct,
      );
      this.setState({ updatedSupplierProducts });
    }
  };
  handleInputChange = (fieldName, input) => {
    let newState = updateObject(this.state);
    newState[fieldName] = input;
    this.setState(newState);
  };
  handleInputClear = fieldName => {
    this.setState(removeKey(this.state, fieldName));
  };
  buildSearchCriteria = () => {
    const { brand, supplier, partName, standard, stocked } = this.state;
    return { brand, supplier, partName, standard, stocked };
  };
  hasSelectionCriteria = () => {
    const { partTypeSelected, brandSelected, searchPartName, supplierSelected } = this.state;
    return (
      !!brandSelected || !!supplierSelected || !!searchPartName || doWeHaveObjects(partTypeSelected)
    );
  };

  listParts = () => {
    const { searchFields } = this.state;
    let { parts, supplierProducts } = this.props;
    const searchCriteria = this.getSearchCriteria();
    const filteredLists = filterPartsAndProducts(
      searchFields,
      searchCriteria,
      parts,
      supplierProducts,
    );
    if (filteredLists.parts.length === 0) {
      this.props.addMessage('No matching parts', 'W');
    } else {
      this.setState({ listParts: true });
    }
  };
  getSearchCriteria = () => {
    const {
      partTypeSelected,
      brandSelected,
      searchPartName,
      searchStandard,
      searchStocked,
      supplierSelected,
    } = this.state;
    const searchCriteria = {
      partTypeSelected,
      brandSelected,
      searchPartName,
      searchStandard,
      searchStocked,
      supplierSelected,
    };
    return searchCriteria;
  };

  showSearch = () => {
    this.setState(initialState);
  };

  render() {
    const { searchFields, listParts, updatedParts, updatedSupplierProducts } = this.state;
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
    } = this.props;
    let partsToUse, supplierProductsToUse;
    if (listParts) {
      const filteredLists = filterPartsAndProducts(
        searchFields,
        this.getSearchCriteria(),
        parts,
        supplierProducts,
      );
      partsToUse = filteredLists.parts;
      supplierProductsToUse = filteredLists.supplierProducts;
    }
    return (
      <Fragment key="productReview">
        {listParts ? (
          <Fragment>
            <h2>Review Parts</h2>

            <div className="row full align_right">
              <Button key="newSearch" onClick={this.showSearch}>
                New Search
              </Button>
            </div>
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
              raiseStateForPart={this.raiseStateForPart}
              raiseStateForSupplierProduct={this.raiseStateForSupplierProduct}
            />
          </Fragment>
        ) : (
          <SupplierProductReviewListSelection
            searchFields={searchFields}
            searchCriteria={this.getSearchCriteria()}
            onChange={this.handleInputChange}
            listParts={this.listParts}
            hasSelectionCriteria={this.hasSelectionCriteria()}
          />
        )}
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </Fragment>
    );
  }
}

export default SupplierProductReview;
