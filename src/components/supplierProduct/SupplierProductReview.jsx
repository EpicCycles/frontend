import React, { Fragment } from 'react';
import { removeKey, updateObject } from '../../helpers/utils';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import SupplierProductReviewListSelection from './SupplierProductReviewListSelection';
import { filterPartsAndProducts } from './helpers/filterPartsAndProducts';
import SupplierProductReviewList from "./SupplierProductReviewList";

const initialState = { listParts: false };
class SupplierProductReview extends React.Component {
  state = initialState;
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
    const { brand, supplier, partName } = this.state;
    return !!(brand || supplier || partName);
  };

  listParts = () => {
    let { parts, supplierProducts } = this.props;
    const filteredLists = filterPartsAndProducts(this.state, parts, supplierProducts);
    if (filteredLists.parts.length === 0) {
      this.props.addMessage('No matching parts', 'W');
    } else {
      this.setState({ listParts: true });
    }
  };

  showSearch = () => {
    this.setState(initialState);
  };

  render() {
    const { brand, supplier, partName, standard, stocked, listParts } = this.state;
    const {
      isLoading,
      parts,
      supplierProducts,
      brands,
      suppliers,
      sections,
      savePart,
      deletePart,
      saveSupplierProduct,
      deleteSupplierProduct,
    } = this.props;
    let partsToUse, supplierProductsToUse;
    if (listParts) {
      const filteredLists = filterPartsAndProducts(this.state, parts, supplierProducts);
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
              supplierProducts={supplierProductsToUse}
              brands={brands}
              suppliers={suppliers}
              sections={sections}
              savePart={savePart}
              deletePart={deletePart}
              saveSupplierProduct={saveSupplierProduct}
              deleteSupplierProduct={deleteSupplierProduct}
            />
          </Fragment>
        ) : (
          <SupplierProductReviewListSelection
            brands={brands}
            suppliers={suppliers}
            onChange={this.handleInputChange}
            brandSelected={brand}
            supplierSelected={supplier}
            onClick={this.handleInputClear}
            partName={partName}
            standard={standard}
            stocked={stocked}
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
