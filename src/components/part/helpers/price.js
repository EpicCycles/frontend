import { findSupplierProduct } from './supplierProduct';

export const calculatePrice = (is_bike_quote, part, supplierProducts = []) => {
  let price;
  let supplier;

  if (part) {
    const supplierProduct = findSupplierProduct(part, supplierProducts);
    if (supplierProduct) {
      if (is_bike_quote) {
        price = supplierProduct.fitted_price;
      } else {
        price = supplierProduct.rrp;
      }
      supplier = supplierProduct.supplier;
    }
  }

  return { price, supplier };
};
