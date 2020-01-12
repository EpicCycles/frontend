import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { partCanBeOmitted, partCanBeSubstituted } from './helpers/part';
import { fixedDetailsClassname } from '../app/model/helpers/display';
import { getModelKey } from '../app/model/helpers/model';
import PartViewRow from './PartViewRow';
import { supplierProductFields } from '../app/model/helpers/fields';
import ModelViewRow from '../app/model/ModelViewRow';

const PartDisplayGridRow = props => {
  const {
    part,
    sections,
    suppliers,
    brands,
    section,
    lockFirstColumn,
    typeIndex,
    supplierProducts,
    showSupplierProducts,
    includeActions,
    editPart,
    deletePart,
  } = props;
  const supplierProductsForPart = supplierProducts.filter(
    supplierProduct => supplierProduct.part === part.id,
  );
  const firstSupplierProduct = supplierProductsForPart.shift();
  return (
    <Fragment>
      <div key={`partRow${part.id}`} className="grid-row">
        <div
          className={`grid-item ${fixedDetailsClassname(lockFirstColumn)}`}
          key={`section_${part.id}`}
          data-test="section-cell"
        >
          {typeIndex === 0 && section.name}
        </div>
        <PartViewRow
          part={part}
          sections={sections}
          supplierProducts={supplierProductsForPart}
          brands={brands}
          key={`partViewRow${part.id}`}
        />
        {showSupplierProducts && (
          <ModelViewRow
            key={`supplierProduct${getModelKey(firstSupplierProduct)}`}
            modelFields={supplierProductFields}
            model={firstSupplierProduct}
            sourceDataArrays={{ suppliers }}
          />
        )}
        {includeActions && (
          <div
            className="grid-item align_center"
            key={`partActions${part.id}`}
            data-test="part-actions"
          >
            {editPart && partCanBeSubstituted(part, sections) && (
              <Icon
                key={`partEdit${part.id}`}
                name="edit"
                onClick={() => editPart(part)}
                data-test="edit-icon"
              />
            )}
            {deletePart && partCanBeOmitted(part, sections) && (
              <Icon
                key={`partDelete${part.id}`}
                name="delete"
                onClick={() => deletePart(part.id)}
                data-test="delete-icon"
              />
            )}
          </div>
        )}
      </div>
      {showSupplierProducts &&
        supplierProductsForPart.map(supplierProduct => (
          <div className="grid-row" key={`supplierProductRow${supplierProduct.id}`}>
            <ModelViewRow
              key={`supplierProduct${supplierProduct.id}`}
              modelFields={supplierProductFields}
              model={supplierProduct}
              sourceDataArrays={{ suppliers }}
            />
          </div>
        ))}
    </Fragment>
  );
};
PartDisplayGridRow.propTypes = {
  part: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  brands: PropTypes.array,
  suppliers: PropTypes.array,
  section: PropTypes.object.isRequired,
  lockFirstColumn: PropTypes.bool,
  typeIndex: PropTypes.number,
  supplierProducts: PropTypes.array,
  showSupplierProducts: PropTypes.bool,
  includeActions: PropTypes.bool,
  editPart: PropTypes.func,
  deletePart: PropTypes.func,
};
export default PartDisplayGridRow;
