/* eslint-disable max-len */

import { quotePartValidation } from './quotePartValidation';

describe('validatedQuotePart', () => {
  const normalPartType = { id: 16, can_be_substituted: true, can_be_omitted: true };
  const noAlternatePartType = { id: 16, can_be_substituted: false, can_be_omitted: true };
  const parts = [
    { id: 12, part_name: 'bike', brand: 1, partType: 16 },
    { id: 13, part_name: 'other', brand: 2, partType: 16 },
  ];
  const brands = [
    { id: 1, brand_name: 'B1' },
    { id: 2, brand_name: 'B2' },
  ];
  describe('for a bike quote', () => {
    it('should return no errors when all fields are OK', () => {
      const startPart = {
        partType: normalPartType.id,
        _partType: normalPartType,
        part_desc: 'B1 Bike',
        quantity: 1,
        part_price: 12.99,
        _isBike: true,
      };
      const validatedPart = {
        _isBike: true,
        partType: normalPartType.id,
        _partType: normalPartType,
        part_desc: 'B1 Bike',
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        quantity: 1,
        part_price: 12.99,
        trade_in_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should reset part desc if the part type cannot be substituted', () => {
      const startPart = {
        partType: noAlternatePartType.id,
        _partType: noAlternatePartType,
        part_desc: 'B1 Bike',
        quantity: 1,
        part_price: 12.99,
        _isBike: true,
        not_required: true,
      };
      const validatedPart = {
        _isBike: true,
        not_required: true,
        partType: noAlternatePartType.id,
        _partType: noAlternatePartType,
        part_desc: undefined,
        _completePart: undefined,
        part: undefined,
        quantity: undefined,
        part_price: undefined,
        additional_data: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should reset trade in price if the part is required', () => {
      const startPart = {
        partType: normalPartType.id,
        _partType: normalPartType,
        part_desc: 'B1 Bike',
        quantity: 1,
        part_price: 12.99,
        trade_in_price: 2.99,
        _isBike: true,
      };
      const validatedPart = {
        partType: normalPartType.id,
        _partType: normalPartType,
        _isBike: true,
        part_desc: 'B1 Bike',
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        quantity: 1,
        part_price: 12.99,
        trade_in_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return no errors when all fields are OK for a replacement part', () => {
      const startPart = {
        part_desc: 'B2 other',
        _partType: normalPartType,
        not_required: true,
        trade_in_price: 12.99,
        part_price: 22.99,
        partType: 16,
      };
      const validatedPart = {
        part_desc: 'B2 other',
        partType: 16,
        _partType: normalPartType,
        not_required: true,
        quantity: undefined,
        _completePart: { id: 13, part_name: 'other', brand: 2, partType: 16 },
        part: 13,
        trade_in_price: 12.99,
        part_price: 22.99,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return no errors when all fields are OK for an omitted part', () => {
      const startPart = {
        _isBike: true,
        not_required: true,
        trade_in_price: 12.99,
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        not_required: true,
        _completePart: undefined,
        part: undefined,
        partType: 16,
        _partType: normalPartType,
        quantity: undefined,
        trade_in_price: 12.99,
        additional_data: undefined,
        part_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return part error when part is not found', () => {
      const startPart = {
        _isBike: true,
        part_desc: 'B3 Bike',
        quantity: 1,
        part_price: 12.99,
        additional_data: 'big sprockets',
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        part_desc: 'B3 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: undefined,
        part: undefined,
        quantity: undefined,
        trade_in_price: undefined,
        part_price: undefined,
        additional_data: undefined,
        error: true,
        error_detail: { part_desc: 'Please include a brand in the part name to add this part.' },
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return price error when new part with no price', () => {
      const startPart = {
        part_desc: 'B1 Bike',
        quantity: 1,
        partType: 16,
        _isBike: true,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        part_desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        trade_in_price: undefined,
        quantity: 1,
        part_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return a quantity error when this is not a replacement part and there is no quantity', () => {
      const startPart = {
        _isBike: true,
        part_desc: 'B1 Bike',
        part_price: 12.99,
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        part_desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        part_price: 12.99,
        trade_in_price: undefined,
        club_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
  });
  describe('for a non bike quote', () => {
    it('should set part_price to ticket price when present', () => {
      const startPart = {
        part_desc: 'B1 Bike',
        part_price: 12.99,
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        part_desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        part_price: 12.99,
        trade_in_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should add part details when a part is found', () => {
      const startPart = {
        part_desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        part_desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        trade_in_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
  });
});
