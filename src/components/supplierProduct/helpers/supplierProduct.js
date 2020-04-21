import { updateObjectInArray } from '../../../helpers/utils';
import { buildBrandNameArray } from '../../brand/helpers/brand';
import { buildPartObject } from '../../part/helpers/part';
import { textToNumber } from '../../../helpers/textToNumber';

export const supplierProductHeaders = [
  'Part Type',
  'Supplier',
  'Code',
  'Description',
  'Build Price',
  'Ticket Price',
  'Club Price',
  'RRP',
  'Trade In Value',
  'Stocked',
  'Trade price',
];

export const buildSupplierProductForApi = (rowMappings, uploadedData, brands) => {
  const brandsLower = buildBrandNameArray(brands);
  let updatedBrands = brands.slice();
  let parts = [];
  let partsMissingBrands = [];

  rowMappings.forEach(rowMapping => {
    if (!rowMapping.ignore) {
      const dataToUse = uploadedData[rowMapping.rowIndex];

      if (rowMapping.partType) {
        let part = buildPartObject(rowMapping.partType, dataToUse[3], brandsLower, undefined);
        if (!part.brand) {
          partsMissingBrands.push(dataToUse[3]);
        } else {
          part.trade_in_price = textToNumber(dataToUse[8]);
          part.rrp = textToNumber(dataToUse[7]);
          part.stocked = dataToUse[9].toUpperCase() === 'Y';
          part.standard = true;
          if (rowMapping.supplier) {
            let brand = updatedBrands.filter(brand => brand.id === part.brand)[0];
            if (!brand.supplier.includes(rowMapping.supplier)) {
              brand.supplier.push(rowMapping.supplier);
              brand.changed = true;
              updatedBrands = updateObjectInArray(updatedBrands, brand, brand.id);
            }
            part.supplierProduct = {
              supplier: rowMapping.supplier,
              product_code: dataToUse[2],
              fitted_price: textToNumber(dataToUse[4]),
              ticket_price: textToNumber(dataToUse[5]),
              rrp: textToNumber(dataToUse[7]),
              trade_price: textToNumber(dataToUse[10]),
              club_price: textToNumber(dataToUse[6]),
            };
          }
          parts.push(part);
        }
      }
    }
  });
  const brandsToSave = updatedBrands.filter(brand => brand.changed);
  return { updatedBrands: brandsToSave, parts, partsMissingBrands };
};
