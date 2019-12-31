import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import BrandSelect from '../brand/BrandSelect';
import FormTextInput from '../../common/FormTextInput';
import { BRAND_FIELD, PART_NAME_FIELD } from '../app/model/helpers/fields';
import { validateModelAndSetErrors } from '../app/model/helpers/model';
const partFields = [BRAND_FIELD, PART_NAME_FIELD];
const BikeUploadPartsEditPart = props => {
  const changePart = (fieldName, input) => {
    props.applyPartChange(
      props.sectionIndex,
      props.partTypeIndex,
      props.partIndex,
      fieldName,
      input,
    );
  };

  const {
    brands,
    uploadPart,
    partIndex,
    partTypeIndex,
    sectionIndex,
    handleOpenModal,
  } = props;
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
            onChange={changePart}
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
          onChange={changePart}
          error={error_detail.part_name}
          size={100}
        />
      </div>
      <div className="grid-item--borderless">{uploadPart.models.join()}</div>
    </Fragment>
  );
};

export default BikeUploadPartsEditPart;
