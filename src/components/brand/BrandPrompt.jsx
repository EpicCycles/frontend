import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import BrandModal from '../brand/BrandModal';
import { NEW_ELEMENT_ID } from '../../helpers/constants';
import BrandPromptPart from './BrandPromptPart';
import { generateRandomCode } from '../../helpers/utils';

class BrandPrompt extends React.Component {
  state = { showModal: false };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.brands !== prevProps.brands) {
      this.props.actionOnBrandsChange();
    }
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  saveBrand = brand => {
    const brandsWithUpdates = this.props.brands.slice();
    brandsWithUpdates.push(brand);
    this.props.saveBrands(brandsWithUpdates);
  };
  render() {
    const { showModal } = this.state;
    const { brands, productDescriptions, addBrandToPart } = this.props;
    const displayProductDescriptions = productDescriptions.sort((a, b) => a < b);
    return (
      <Fragment key="bikeUploadParts">
        <div className="row">
          {showModal ? (
            <BrandModal
              key="brandModalInPartList"
              brandModalOpen={showModal}
              componentKey={NEW_ELEMENT_ID}
              saveBrand={this.saveBrand}
              closeBrandModal={this.handleCloseModal}
              brands={brands}
            />
          ) : (
            <Button key="addNewBrand" onClick={this.handleOpenModal}>
              Add Brand
            </Button>
          )}
        </div>
        <section key="partData" className="grid fit-content" id="partData">
          {displayProductDescriptions.map(description => (
            <BrandPromptPart
              brands={brands}
              partDescription={description}
              addBrandToPart={addBrandToPart}
              key={`part${generateRandomCode()}`}
            />
          ))}
        </section>
      </Fragment>
    );
  }
}

export default BrandPrompt;
