import React, { Fragment } from 'react';
import {
  doWeHaveObjects,
  findObjectWithKey,
  removeItemFromArray,
  removeKey,
  updateObject,
  updateObjectInArray,
} from '../../helpers/utils';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import SupplierProductReviewListSelection from './SupplierProductReviewListSelection';
import SupplierProductHeaders from './SupplierProductHeaders';
import SupplierProductReviewPart from './SupplierProductReviewPart';
import { filterPartsAndProducts } from './helpers/filterPartsAndProducts';
import { savePartsAndProducts } from '../../state/actions/part';

const initialState = {
  parts: [],
  supplierProducts: [],
  saveCompleted: false,
};

class SupplierProductReviewList extends React.Component {
  state = updateObject(initialState);
  static getDerivedStateFromProps(props, state) {
    // Any time the current part changes,
    // Reset any parts of state that are tied to that part.
    // In this simple example, that's just the email.
    if (state.saveCompleted && !props.isLoading) {
      let { parts, supplierProducts } = props;

      const filteredLists = filterPartsAndProducts(state, parts, supplierProducts);

      return {
        parts: filteredLists.parts,
        supplierProducts: filteredLists.supplierProducts,
        saveComplete: false,
      };
    }
    return null;
  }

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
  hasChanges = () => {
    const { parts, supplierProducts } = this.state;
    return (
      parts.some(p => p.changed || p.deleted) ||
      supplierProducts.some(sp => sp.changed || sp.deleted)
    );
  };

  listParts = () => {
    let { parts, supplierProducts } = this.props;
    const filteredLists = filterPartsAndProducts(this.state, parts, supplierProducts);
    this.setState(filteredLists);
  };

  showSearch = () => {
    if (this.hasChanges()) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Are You Sure?')) return;
    }
    console.log('resetting');
    this.setState(initialState);
  };
  saveChanges = () => {
    const { parts, supplierProducts } = this.state;
    const { savePart, deletePart, saveSupplierProduct, deleteSupplierProduct } = this.props;
    const partsToSave = parts.filter(part => part.deleted || part.changed);
    const supplierproductsToSave = supplierProducts.filter(sp => sp.changed || sp.deleted);
    this.props.savePartsAndProducts(partsToSave, supplierproductsToSave);
    this.setState({ saveCompleted: true });
  };
  savePart = part => {
    const parts = updateObjectInArray(this.state.parts, part);
    this.setState({ parts });
  };
  saveSupplierProduct = supplierProduct => {
    const supplierProducts = updateObjectInArray(this.state.supplierProducts, supplierProduct);
    this.setState({ supplierProducts });
  };
  deletePart = modelKey => {
    let { parts, supplierProducts } = this.state;
    const existingPart = findObjectWithKey(parts, modelKey);
    if (existingPart.id) {
      parts = updateObjectInArray(parts, updateObject(existingPart, { deleted: true }));
      supplierProducts = supplierProducts.map(sp => {
        if (sp.part === existingPart.id) {
          return updateObject(sp, { deleted: true });
        }
        return sp;
      });
    } else {
      parts = removeItemFromArray(parts, modelKey);
    }
    this.setState({ supplierProducts, parts });
  };
  deleteSupplierProduct = modelKey => {
    let { supplierProducts } = this.state;
    const existingSupplierProduct = findObjectWithKey(supplierProducts, modelKey);
    if (existingSupplierProduct.id) {
      supplierProducts = updateObjectInArray(
        supplierProducts,
        updateObject(existingSupplierProduct, { deleted: true }),
      );
    } else {
      supplierProducts = removeItemFromArray(supplierProducts, modelKey);
    }
    this.setState({ supplierProducts });
  };

  render() {
    const { brand, supplier, partName, standard, stocked, parts, supplierProducts } = this.state;
    const { isLoading, brands, suppliers, sections } = this.props;
    const hasChanges = this.hasChanges();
    return (
      <Fragment key="productReview">
        {!doWeHaveObjects(parts) ? (
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
        ) : (
          <Fragment>
            <h2>Review Parts</h2>

            <div className="row full align_right">
              <Button key="newSearch" onClick={this.showSearch}>
                New Search
              </Button>
              <Button key="saveChanges" disabled={!hasChanges} onClick={this.saveChanges}>
                Save Changes
              </Button>
            </div>
            <div
              key="partReviewGrid"
              className="grid"
              style={{
                height: window.innerHeight - 100 + 'px',
                width: window.innerWidth - 50 + 'px',
                overflow: 'scroll',
              }}
            >
              <SupplierProductHeaders />
              {parts.map(part => {
                return (
                  <SupplierProductReviewPart
                    part={part}
                    supplierProducts={supplierProducts}
                    brands={brands}
                    suppliers={suppliers}
                    sections={sections}
                    key={`review_${part.id}`}
                    savePart={this.savePart}
                    deletePart={this.deletePart}
                    saveSupplierProduct={this.saveSupplierProduct}
                    deleteSupplierProduct={this.deleteSupplierProduct}
                  />
                );
              })}
            </div>
          </Fragment>
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

export default SupplierProductReviewList;
