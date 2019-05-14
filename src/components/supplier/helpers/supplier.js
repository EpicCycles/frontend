import { doWeHaveObjects } from '../../../helpers/utils';

export const getSupplierName = (supplier, suppliers) => {
  if (!supplier) return undefined;
  if (Array.isArray(supplier)) {
    const supplierNameArray = supplier.map(supplierId => {
      return findSupplierNameforId(supplierId, suppliers);
    });
    return supplierNameArray;
  }
  return findSupplierNameforId(supplier, suppliers);
};
export const findSupplierNameforId = (supplierId, suppliers) => {
  if (!supplierId) return;
  let supplierName = 'Unknown Supplier';
  if (Array.isArray(suppliers)) {
    suppliers.some(supplier => {
      if (supplier.id.toString() === supplierId.toString()) {
        supplierName = supplier.supplier_name;
        return true;
      }
      return false;
    });
  }
  return supplierName;
};
export const getBrandsForSupplier = (supplierId, brands) => {
  let brandNames = [];
  if (doWeHaveObjects(brands))
    brands.forEach(brand => {
      if (brand.supplier && brand.supplier.includes(supplierId)) brandNames.push(brand.brand_name);
    });
  return brandNames;
};
