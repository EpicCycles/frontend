import { calculatePrice } from './price';

describe('calculatePrice', () => {
  const supplierProducts = [{ id: 1, part: 21, rrp: 12, fitted_price: 23 }];
  const part = { id: 21, trade_in_price: 36.0 };
  const partNoPrices = { id: 2021, trade_in_price: 136.0 };

  it('should return no prices when there is no bike part or supplier part', () => {
    const expectedPrices = { part_price: undefined };
    expect(calculatePrice()).toEqual(expectedPrices);
  });
  it('should return a part rrp when no bike part is passed but part is', () => {
    const expectedPrices = { part_price: 12 };
    expect(calculatePrice(false, part, supplierProducts)).toEqual(expectedPrices);
  });
  it('should return a fitted price when bike quote, no bike part is passed, part is', () => {
    const expectedPrices = { part_price: 23 };
    expect(calculatePrice(true, part, supplierProducts)).toEqual(expectedPrices);
  });
  it('should return a no price when part has no suplier products', () => {
    const expectedPrices = { part_price: undefined };
    expect(calculatePrice(false, partNoPrices, supplierProducts)).toEqual(expectedPrices);
  });
});
