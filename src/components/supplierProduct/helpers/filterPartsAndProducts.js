import { findMatchingObjects } from '../../../helpers/search';
import { SUPPLIER } from '../../app/model/helpers/fields';

export const filterPartsAndProducts = (
  searchFields,
  searchCriteria,
  partsComplete,
  supplierProductsComplete,
) => {
  // first filter product
  const partFieldsToCheck = searchFields.filter(field => field.modelFieldName !== SUPPLIER);
  const supplierProductFieldsToCheck = searchFields.filter(
    field => field.modelFieldName === SUPPLIER,
  );
  let parts = findMatchingObjects(partsComplete, partFieldsToCheck, searchCriteria);
  if (!!searchCriteria.selectedSupplier) {
    const supplierProductsForSupplier = findMatchingObjects(
      supplierProductsComplete,
      supplierProductFieldsToCheck,
      searchCriteria,
    );
    const partIdToInclude = supplierProductsForSupplier.map(sp => sp.part);
    parts = parts.filter(part => partIdToInclude.includes(part.id));
  }
  const partIds = parts.map(part => part.id);
  const supplierProducts = supplierProductsComplete.filter(sp => partIds.includes(sp.part));
  return { parts, supplierProducts };
};
