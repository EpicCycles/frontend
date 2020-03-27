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
        desc: 'B1 Bike',
        qty: 1,
        price: 12.99,
        _isBike: true,
      };
      const validatedPart = {
        _isBike: true,
        partType: normalPartType.id,
        _partType: normalPartType,
        desc: 'B1 Bike',
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        qty: 1,
        price: 12.99,
        tradeIn: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should reset part desc if the part type cannot be substituted', () => {
      const startPart = {
        partType: noAlternatePartType.id,
        _partType: noAlternatePartType,
        desc: 'B1 Bike',
        qty: 1,
        price: 12.99,
        _isBike: true,
        omit: true,
      };
      const validatedPart = {
        _isBike: true,
        omit: true,
        partType: noAlternatePartType.id,
        _partType: noAlternatePartType,
        desc: undefined,
        _completePart: undefined,
        part: undefined,
        qty: undefined,
        price: undefined,
        info: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should reset trade in price if the part is required', () => {
      const startPart = {
        partType: normalPartType.id,
        _partType: normalPartType,
        desc: 'B1 Bike',
        qty: 1,
        price: 12.99,
        tradeIn: 2.99,
        _isBike: true,
      };
      const validatedPart = {
        partType: normalPartType.id,
        _partType: normalPartType,
        _isBike: true,
        desc: 'B1 Bike',
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        qty: 1,
        price: 12.99,
        tradeIn: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return no errors when all fields are OK for a replacement part', () => {
      const startPart = {
        desc: 'B2 other',
        _partType: normalPartType,
        omit: true,
        tradeIn: 12.99,
        price: 22.99,
        partType: 16,
      };
      const validatedPart = {
        desc: 'B2 other',
        partType: 16,
        _partType: normalPartType,
        omit: true,
        qty: undefined,
        _completePart: { id: 13, part_name: 'other', brand: 2, partType: 16 },
        part: 13,
        tradeIn: 12.99,
        price: 22.99,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return no errors when all fields are OK for an omitted part', () => {
      const startPart = {
        _isBike: true,
        omit: true,
        tradeIn: 12.99,
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        omit: true,
        _completePart: undefined,
        part: undefined,
        partType: 16,
        _partType: normalPartType,
        qty: undefined,
        tradeIn: 12.99,
        info: undefined,
        price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return part error when part is not found', () => {
      const startPart = {
        _isBike: true,
        desc: 'B3 Bike',
        qty: 1,
        price: 12.99,
        info: 'big sprockets',
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        desc: 'B3 Bike',
        partType: 16,
        _partType: normalPartType,
        qty: 1,
        info: 'big sprockets',
        price: 12.99,
        tradeIn: undefined,
        _completePart: undefined,
        part: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return price error when new part with no price', () => {
      const startPart = {
        desc: 'B1 Bike',
        qty: 1,
        partType: 16,
        _isBike: true,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        tradeIn: undefined,
        qty: 1,
        price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should return a qty error when this is not a replacement part and there is no qty', () => {
      const startPart = {
        _isBike: true,
        desc: 'B1 Bike',
        price: 12.99,
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        _isBike: true,
        desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        price: 12.99,
        tradeIn: undefined,
        club_price: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
  });
  describe('for a non bike quote', () => {
    it('should set price to ticket price when present', () => {
      const startPart = {
        desc: 'B1 Bike',
        price: 12.99,
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        price: 12.99,
        tradeIn: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
    it('should add part details when a part is found', () => {
      const startPart = {
        desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
      };
      const validatedPart = {
        desc: 'B1 Bike',
        partType: 16,
        _partType: normalPartType,
        _completePart: { id: 12, part_name: 'bike', brand: 1, partType: 16 },
        part: 12,
        tradeIn: undefined,
        error: false,
        error_detail: {},
      };
      expect(quotePartValidation(startPart, brands, parts)).toEqual(validatedPart);
    });
  });
});
