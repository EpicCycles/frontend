/* eslint-disable max-len */
import {
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  TEXT,
} from '../../app/model/helpers/fields';

import {
  INFO_FIELD,
  INFO_FIELD_DISABLED,
  FIXED_FIELD,
  FIXED_FIELD_DISABLED,
  OMIT_FIELD,
  OMIT_FIELD_DISABLED,
  DESC_FIELD,
  DESC_FIELD_DISABLED,
  PART_PRICE_FIELD,
  PART_PRICE_FIELD_DISABLED,
  PART_TYPE_FIELD_DISABLED,
  QUANTITY_FIELD_DISABLED,
  quotePartFields,
  SUPPLIER_FIELD_DISABLED,
  TRADE_IN_FIELD,
  TRADE_IN_FIELD_DISABLED,
  QUOTE_PART_FOR_BIKE,
  QUOTE_PART_NON_BIKE,
} from './quotePartFields';
import { updateObject } from '../../../helpers/utils';
import { TOTAL_PRICE_FIELD } from '../../quote/helpers/quoteFields';

describe('quotePartFields', () => {
  const attributesField = {
    fieldName: 'info',
    header: 'Attributes',
    type: TEXT,
    maxLength: 100,
    displaySize: 20,
    placeholder: 'Colour',
    title: 'Colour',
  };
  const partDescForType = updateObject(DESC_FIELD, { listId: 'parts-12', required: true });
  const partDescForTypeOptional = updateObject(DESC_FIELD, {
    listId: 'parts-12',
    required: false,
  });
  const partTypeAttributes = [
    {
      attribute_name: 'Colour',
      in_use: true,
      mandatory: true,
    },
  ];
  describe('for a bike quote', () => {
    it('should return part type and all quote fields when there is no data', () => {
      const quotePart = {};
      const expectedFields = [
        PART_TYPE_FIELD,
        OMIT_FIELD_DISABLED,
        TRADE_IN_FIELD_DISABLED,
        DESC_FIELD_DISABLED,
        FIXED_FIELD_DISABLED,
        QUANTITY_FIELD_DISABLED,
        PART_PRICE_FIELD_DISABLED,
        SUPPLIER_FIELD_DISABLED,
        INFO_FIELD_DISABLED,
        TOTAL_PRICE_FIELD,
      ];
      expect(quotePartFields(QUOTE_PART_FOR_BIKE, quotePart)).toEqual(expectedFields);
    });
    it('should return quote part data when part type is present that can be substituted', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = { _isBike: true, _partType: partType, partType: partType.id };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result[0]).toEqual(PART_TYPE_FIELD);
      expect(result[1]).toEqual(OMIT_FIELD_DISABLED);
      expect(result[2]).toEqual(TRADE_IN_FIELD_DISABLED);
      expect(result[3]).toEqual(partDescForType);
      expect(result).toContainEqual(FIXED_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(INFO_FIELD_DISABLED);
      expect(result).not.toContainEqual(INFO_FIELD);
    });
    it('should not be able to enter data when there is a bike part that cannot be substituted', () => {
      const partType = { id: 12, can_be_substituted: false };
      const bikePart = { id: 23 };
      const quotePart = { _isBike: true, _partType: partType, _bikePart: bikePart };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result[0]).toEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(OMIT_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_FIELD_DISABLED);
      expect(result).toContainEqual(DESC_FIELD_DISABLED);
      expect(result).toContainEqual(FIXED_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(INFO_FIELD_DISABLED);
    });
    it('should return additional part fields when there is a bike part and a quote part that is not a replacement', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        id: 231,
        omit: false,
        partType: 12,
        _partType: partType,
        _bikePart: bikePart,
      };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result[0]).toEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(OMIT_FIELD);
      expect(result).toContainEqual(TRADE_IN_FIELD_DISABLED);
      expect(result[3]).toEqual(partDescForType);
      expect(result).toContainEqual(FIXED_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(INFO_FIELD_DISABLED);
    });
    it('should have desc required when there is a part type but no bike part', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        omit: false,
        partType: 12,
        _isBike: true,
        _partType: partType,
      };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result[0]).toEqual(PART_TYPE_FIELD);
      expect(result).toContainEqual(OMIT_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(FIXED_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(INFO_FIELD_DISABLED);
    });
    it('should return standard fields when there is a quote part but the part cannot be substituted', () => {
      const partType = { id: 12, can_be_substituted: false };
      const quotePart = { id: 231, partType: 12, _isBike: true, _partType: partType };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result[0]).toEqual(PART_TYPE_FIELD);
      expect(result).toContainEqual(OMIT_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(FIXED_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(INFO_FIELD_DISABLED);
    });
    it('should return replacement part fields when there is a replaceable bike part and no quote part', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, partType: 12 };
      const quotePart = { _isBike: true, _partType: partType, _bikePart: bikePart };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result[0]).toEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(OMIT_FIELD);
      expect(result).toContainEqual(TRADE_IN_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(FIXED_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(INFO_FIELD_DISABLED);
    });
    it('should return replacement part fields when there is a replaceable bike part and a quote part', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        id: 231,
        omit: true,
        partType: 12,
        _isBike: true,
        _partType: partType,
        _bikePart: bikePart,
      };

      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result[0]).toEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(OMIT_FIELD);
      expect(result).toContainEqual(
        updateObject(TRADE_IN_FIELD, { required: false, default: 20.0 }),
      );
      expect(result).toContainEqual(partDescForTypeOptional);
      expect(result).toContainEqual(FIXED_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(INFO_FIELD_DISABLED);
    });
    it('should return replacement with required prices when the part is replaced and prices reqd', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        id: 231,
        omit: true,
        partType: 12,
        _isBike: true,
        _partType: partType,
        _bikePart: bikePart,
      };

      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart, undefined, true);
      expect(result[0]).toEqual(PART_TYPE_FIELD_DISABLED);
      expect(result[1]).toEqual(OMIT_FIELD);
      expect(result[2]).toEqual(updateObject(TRADE_IN_FIELD, { required: true, default: 20.0 }));
      expect(result[3]).toEqual(partDescForTypeOptional);
      expect(result[4]).toEqual(FIXED_FIELD_DISABLED);
      expect(result[5]).toEqual(QUANTITY_FIELD_DISABLED);
      expect(result[6]).toEqual(PART_PRICE_FIELD_DISABLED);
      expect(result[7]).toEqual(SUPPLIER_FIELD_DISABLED);
      expect(result[8]).toEqual(INFO_FIELD_DISABLED);
    });
    it('should return additional part fields when there is no bike part and a quote part that is not a replacement', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        id: 231,
        omit: false,
        _completePart: { id: 2345 },
        partType: 12,
        _isBike: true,
        _partType: partType,
      };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(OMIT_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(FIXED_FIELD);
      expect(result[5]).toEqual(updateObject(QUANTITY_FIELD, { required: true, default: 1 }));
      expect(result).toContainEqual(updateObject(PART_PRICE_FIELD, { required: false }));
      expect(result).toContainEqual(SUPPLIER_FIELD_OPTIONAL);
      expect(result).toContainEqual(attributesField);
    });
    it('should have required price when there is no bike part and a quote part that is not a replacement', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        id: 231,
        omit: false,
        _completePart: { id: 2345 },
        partType: 12,
        _isBike: true,
        _partType: partType,
      };
      const result = quotePartFields(QUOTE_PART_FOR_BIKE, quotePart, undefined, true);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(OMIT_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(FIXED_FIELD);
      expect(result[5]).toEqual(updateObject(QUANTITY_FIELD, { required: true, default: 1 }));
      expect(result).toContainEqual(updateObject(PART_PRICE_FIELD, { required: true }));
      expect(result).toContainEqual(SUPPLIER_FIELD_OPTIONAL);
      expect(result).toContainEqual(attributesField);
    });
    it('should show part price required when prices requested on bike quote', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        _isBike: true,
        _partType: partType,
        id: 231,
        omit: false,
        _completePart: { id: 2345 },
        partType: 12,
      };
      const expectedFields = [
        PART_TYPE_FIELD_DISABLED,
        OMIT_FIELD_DISABLED,
        TRADE_IN_FIELD_DISABLED,
        partDescForType,
        FIXED_FIELD,
        updateObject(QUANTITY_FIELD, { default: 1, required: true }),
        updateObject(PART_PRICE_FIELD, { required: true }),
        SUPPLIER_FIELD_OPTIONAL,
        attributesField,
        TOTAL_PRICE_FIELD,
      ];
      expect(quotePartFields(QUOTE_PART_FOR_BIKE, quotePart, undefined, true)).toEqual(
        expectedFields,
      );
    });
  });
  describe('non bike quotePart', () => {
    it('should show disabled fields when no part type is present', () => {
      const expectedFields = [
        PART_TYPE_FIELD,
        DESC_FIELD_DISABLED,
        FIXED_FIELD_DISABLED,
        QUANTITY_FIELD_DISABLED,
        PART_PRICE_FIELD_DISABLED,
        SUPPLIER_FIELD_DISABLED,
        INFO_FIELD_DISABLED,
        TOTAL_PRICE_FIELD,
      ];
      expect(quotePartFields(QUOTE_PART_NON_BIKE, {})).toEqual(expectedFields);
    });
    it('should show disabled fields when no part or desc is present', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const expectedFields = [
        PART_TYPE_FIELD,
        partDescForType,
        FIXED_FIELD_DISABLED,
        QUANTITY_FIELD_DISABLED,
        PART_PRICE_FIELD_DISABLED,
        SUPPLIER_FIELD_DISABLED,
        INFO_FIELD_DISABLED,
        TOTAL_PRICE_FIELD,
      ];
      expect(quotePartFields(QUOTE_PART_NON_BIKE, { _partType: partType })).toEqual(expectedFields);
    });
    it('should show enabled fields when a part is present', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        _partType: partType,
        id: 231,
        omit: false,
        _completePart: { id: 2345 },
        partType: 12,
      };
      const expectedFields = [
        PART_TYPE_FIELD_DISABLED,
        partDescForType,
        FIXED_FIELD,
        updateObject(QUANTITY_FIELD, { required: true, default: 1 }),
        updateObject(PART_PRICE_FIELD, { required: false }),
        SUPPLIER_FIELD_OPTIONAL,
        attributesField,
        TOTAL_PRICE_FIELD,
      ];
      expect(quotePartFields(QUOTE_PART_NON_BIKE, quotePart)).toEqual(expectedFields);
    });
    it('should show enabled fields when a desc is present', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        _partType: partType,
        id: 231,
        omit: false,
        desc: 'New product not standard',
        partType: 12,
      };
      const expectedFields = [
        PART_TYPE_FIELD,
        partDescForType,
        FIXED_FIELD,
        updateObject(QUANTITY_FIELD, { required: true, default: 1 }),
        updateObject(PART_PRICE_FIELD, { required: false }),
        SUPPLIER_FIELD_OPTIONAL,
        attributesField,
        TOTAL_PRICE_FIELD,
      ];
      expect(quotePartFields(QUOTE_PART_NON_BIKE, quotePart)).toEqual(expectedFields);
    });
    it('should show part price required when prices requested', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        _partType: partType,
        id: 231,
        omit: false,
        _completePart: { id: 2345 },
        partType: 12,
      };
      const expectedFields = [
        PART_TYPE_FIELD_DISABLED,
        partDescForType,
        FIXED_FIELD,
        updateObject(QUANTITY_FIELD, { required: true, default: 1 }),
        updateObject(PART_PRICE_FIELD, { required: true }),
        SUPPLIER_FIELD_OPTIONAL,
        attributesField,
        TOTAL_PRICE_FIELD,
      ];
      expect(quotePartFields(QUOTE_PART_NON_BIKE, quotePart, undefined, true)).toEqual(
        expectedFields,
      );
    });
  });
});
