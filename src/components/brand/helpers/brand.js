import { findSupplierNameforId } from '../../supplier/helpers/supplier';
import { getModelKey } from '../../app/model/helpers/model';
import { findObjectWithId } from '../../../helpers/utils';

export const buildBrandNameArray = brands => {
  const brandsLower = brands.map(brand => {
    return {
      id: brand.id,
      brand_name: brand.brand_name.toLowerCase(),
    };
  });
  brandsLower.sort((a, b) => b.brand_name.length - a.brand_name.length);
  return brandsLower;
};

export const getBrandName = (brandId, brands) => {
  if (!brandId) return undefined;
  const brand = findObjectWithId(brands, brandId);
  return brand ? brand.brand_name : 'Unknown Brand';
};

export const getSupplierNamesForBrand = (brand, suppliers) => {
  if (brand && brand.supplier)
    return brand.supplier.map(supplierId => findSupplierNameforId(supplierId, suppliers));
  return [];
};

export const buildBrandOptions = brands => {
  if (brands)
    return brands.map(brand => {
      return {
        value: String(getModelKey(brand)),
        name: brand.brand_name,
      };
    });
  return [];
};
