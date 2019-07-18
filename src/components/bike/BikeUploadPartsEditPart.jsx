import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import BrandSelect from '../brand/BrandSelect';
import FormTextInput from '../../common/FormTextInput';
import { BRAND_FIELD, PART_NAME_FIELD } from '../app/model/helpers/fields';
import { validateModelAndSetErrors } from '../app/model/helpers/model';
const partFields = [BRAND_FIELD, PART_NAME_FIELD];
class BikeUploadPartsEditPart extends React.Component {
  changePart = (fieldName, input) => {
    this.props.applyPartChange(
      this.props.sectionIndex,
      this.props.partTypeIndex,
      this.props.partIndex,
      fieldName,
      input,
    );
  };

  render() {
    const {
      brands,
      uploadPart,
      partIndex,
      partTypeIndex,
      sectionIndex,
      handleOpenModal,
    } = this.props;
    const componentKey = `_${sectionIndex}_${partTypeIndex}_${partIndex}`;
    const part = uploadPart.part;
    const error_detail = validateModelAndSetErrors(part, partFields);
    return (
      <Fragment>
        <div className="grid-item--borderless row">
          <div className="row align_top">
            <BrandSelect
              key={`brand${componentKey}`}
              brands={brands}
              fieldName="brand"
              onChange={this.changePart}
              brandSelected={part.brand}
              error={error_detail.brand}
            />
            <Icon
              key={`addBrand${componentKey}`}
              name="add circle"
              onClick={handleOpenModal}
              title="Add new brand"
            />
          </div>
        </div>
        <div className="grid-item--borderless">
          <FormTextInput
            key={`partName${componentKey}`}
            fieldName="part_name"
            value={part.part_name}
            onChange={this.changePart}
            error={error_detail.part_name}
            size={100}
          />
        </div>
        <div className="grid-item--borderless">{uploadPart.models.join()}</div>
      </Fragment>
    );
  }
}

export default BikeUploadPartsEditPart;
