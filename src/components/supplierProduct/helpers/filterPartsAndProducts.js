import { findMatchingObjects } from '../../../helpers/search';
import {
  BRAND,
  CHECKBOX,
  PART_NAME,
  PART_TYPE,
  PART_TYPE_MULTIPLE,
  STANDARD,
  STOCKED,
  SUPPLIER,
  TEXT,
} from '../../app/model/helpers/fields';
const supplierSearchField = {
  displayName: 'Supplier:',
  header: 'Supplier:',
  fieldName: 'supplierSelected',
  modelFieldName: SUPPLIER,
  type: SUPPLIER,
};
export const supplierProductSearchFields = [
  {
    displayName: 'Part Type:',
    header: 'Part Type:',
    fieldName: 'partTypeSelected',
    modelFieldName: PART_TYPE,
    type: PART_TYPE_MULTIPLE,
  },
  {
    displayName: 'Brand:',
    header: 'Brand:',
    fieldName: 'brandSelected',
    modelFieldName: BRAND,
    type: BRAND,
  },
  supplierSearchField,
  {
    displayName: 'Part name contains:',
    header: 'Part name contains:',
    modelFieldName: PART_NAME,
    fieldName: 'searchPartName',
    type: TEXT,
    placeholder: 'part name',
  },
  {
    displayName: 'Standard only',
    header: 'Standard only',
    fieldName: 'searchStandard',
    modelFieldName: STANDARD,
    type: CHECKBOX,
  },
  {
    displayName: 'Stocked only',
    header: 'Stocked only',
    fieldName: 'searchStocked',
    modelFieldName: STOCKED,
    type: CHECKBOX,
  },
];

export const filterPartsAndProducts = (searchCriteria, partsComplete, supplierProductsComplete) => {
  // first filter product
  const partFieldsToCheck = supplierProductSearchFields.filter(
    field => field.modelFieldName !== SUPPLIER,
  );
  const supplierProductFieldsToCheck = [supplierSearchField];
  let parts = findMatchingObjects(partsComplete, partFieldsToCheck, searchCriteria);
  if (!!searchCriteria.supplierSelected) {
    const supplierProducts = findMatchingObjects(
      supplierProductsComplete,
      supplierProductFieldsToCheck,
      searchCriteria,
    );
    const partIdToInclude = supplierProducts.map(sp => sp.part);
    parts = parts.filter(part => partIdToInclude.includes(part.id));
    return { parts, supplierProducts };
  }
  const partIds = parts.map(part => part.id);
  const supplierProducts = supplierProductsComplete.filter(sp => partIds.includes(sp.part));
  return { parts, supplierProducts };
};
