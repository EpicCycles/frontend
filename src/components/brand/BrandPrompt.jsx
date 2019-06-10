import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import BrandModal from '../brand/BrandModal';
import { NEW_ELEMENT_ID } from '../../helpers/constants';

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
  }

  saveBrand = brand => {
    const brandsWithUpdates = this.props.brands.slice();
    brandsWithUpdates.push(brand);
    this.props.saveBrands(brandsWithUpdates);
  };

  render() {
    const { showModal } = this.state;
    const { brands, productDescriptions } = this.props;
    const displayProductDescriptions = productDescriptions.sort((a, b) => a < b);
    return (
      <Fragment key="bikeUploadParts">
        <div>
          <Button key="addNewBrand" onClick={this.handleOpenModal}>
            Add Brand
          </Button>
          {showModal && (
            <BrandModal
              key="brandModalInPartList"
              brandModalOpen={showModal}
              componentKey={NEW_ELEMENT_ID}
              saveBrand={this.saveBrand}
              closeBrandModal={this.handleCloseModal}
              brands={brands}
            />
          )}
        </div>
        <section key="partData" className="flex-vertical" id="partData">
          {displayProductDescriptions.map((description, descIndex) => (
            <div key={`desc${descIndex}`}>{description}</div>
          ))}
        </section>
      </Fragment>
    );
  }
}

export default BrandPrompt;
