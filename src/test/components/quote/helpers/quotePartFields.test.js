/* eslint-disable max-len */
import {
  PART_TYPE_FIELD,
  QUANTITY_FIELD,
  SUPPLIER_FIELD_OPTIONAL,
  TEXT,
  TRADE_IN_PRICE_FIELD,
} from '../../../../components/app/model/helpers/fields';

import {
  ADDITIONAL_DATA_FIELD,
  ADDITIONAL_DATA_FIELD_DISABLED,
  NOT_REQUIRED_FIELD,
  NOT_REQUIRED_FIELD_DISABLED,
  PART_DESC_FIELD,
  PART_DESC_FIELD_DISABLED,
  PART_PRICE_FIELD,
  PART_PRICE_FIELD_DISABLED,
  PART_TYPE_FIELD_DISABLED,
  QUANTITY_FIELD_DISABLED,
  quotePartFields,
  SUPPLIER_FIELD_DISABLED,
  TRADE_IN_PRICE_FIELD_DISABLED,
} from '../../../../components/quote/helpers/quotePartFields';
import { updateObject } from '../../../../helpers/utils';

describe('quotePartFields', () => {
  const attributesField = {
    fieldName: 'additional_data',
    header: 'Attributes',
    type: TEXT,
    maxLength: 100,
    displaySize: 20,
    placeholder: 'Colour',
    title: 'Colour',
  };
  const partDescForType = updateObject(PART_DESC_FIELD, { listId: 'parts-12', required: true });
  const partDescForTypeOptional = updateObject(PART_DESC_FIELD, {
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
      const quotePart = { _isBike: true };
      const expectedFields = [
        PART_TYPE_FIELD,
        NOT_REQUIRED_FIELD_DISABLED,
        TRADE_IN_PRICE_FIELD_DISABLED,
        PART_DESC_FIELD_DISABLED,
        QUANTITY_FIELD_DISABLED,
        PART_PRICE_FIELD_DISABLED,
        SUPPLIER_FIELD_DISABLED,
        ADDITIONAL_DATA_FIELD_DISABLED,
      ];
      expect(quotePartFields(quotePart)).toEqual(expectedFields);
    });
    it('should return quote part data when part type is present that can be substituted', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = { _isBike: true, _partType: partType };
      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
      expect(result).not.toContainEqual(ADDITIONAL_DATA_FIELD);
    });
    it('should not be able to enter data when there is a bike part that cannot be substituted', () => {
      const partType = { id: 12, can_be_substituted: false };
      const bikePart = { id: 23 };
      const quotePart = { _isBike: true, _partType: partType, _bikePart: bikePart };
      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(PART_DESC_FIELD_DISABLED);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
    });
    it('should return additional part fields when there is a bike part and a quote part that is not a replacement', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        id: 231,
        not_required: false,
        partType: 12,
        _isBike: true,
        _partType: partType,
        _bikePart: bikePart,
      };
      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForTypeOptional);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
    });
    it('should have desc required when there is a part type but no bike part', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        not_required: false,
        partType: 12,
        _isBike: true,
        _partType: partType,
      };
      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
    });
    it('should return standard fields when there is a quote part but the part cannot be substituted', () => {
      const partType = { id: 12, can_be_substituted: false };
      const quotePart = { id: 231, partType: 12, _isBike: true, _partType: partType };
      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
    });
    it('should return replacement part fields when there is a replacable bike part and no quote part', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, partType: 12 };
      const quotePart = { _isBike: true, _partType: partType, _bikePart: bikePart };
      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForTypeOptional);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
    });
    it('should return replacement part fields when there is a replaceable bike part and a quote part', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        id: 231,
        not_required: true,
        partType: 12,
        _isBike: true,
        _partType: partType,
        _bikePart: bikePart,
      };

      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD);
      expect(result).toContainEqual(
        updateObject(TRADE_IN_PRICE_FIELD, { required: false, default: 20.0 }),
      );
      expect(result).toContainEqual(partDescForTypeOptional);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
    });
    it('should return replacement wuth required prices when the part is replaced and prices reqd', () => {
      const partType = { id: 12, can_be_substituted: true };
      const bikePart = { id: 23, trade_in_price: 20.0 };
      const quotePart = {
        id: 231,
        not_required: true,
        partType: 12,
        _isBike: true,
        _partType: partType,
        _bikePart: bikePart,
      };

      const result = quotePartFields(quotePart, undefined, true);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD);
      expect(result).toContainEqual(
        updateObject(TRADE_IN_PRICE_FIELD, { required: true, default: 20.0 }),
      );
      expect(result).toContainEqual(partDescForTypeOptional);
      expect(result).toContainEqual(QUANTITY_FIELD_DISABLED);
      expect(result).toContainEqual(PART_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(SUPPLIER_FIELD_DISABLED);
      expect(result).toContainEqual(ADDITIONAL_DATA_FIELD_DISABLED);
    });
    it('should return additional part fields when there is no bike part and a quote part that is not a replacement', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        id: 231,
        not_required: false,
        _completePart: { id: 2345 },
        partType: 12,
        _isBike: true,
        _partType: partType,
      };
      const result = quotePartFields(quotePart);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(updateObject(QUANTITY_FIELD, { required: true, default: '1' }));
      expect(result).toContainEqual(updateObject(PART_PRICE_FIELD, { required: false }));
      expect(result).toContainEqual(SUPPLIER_FIELD_OPTIONAL);
      expect(result).toContainEqual(attributesField);
    });
    it('should have required price when there is no bike part and a quote part that is not a replacement', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        id: 231,
        not_required: false,
        _completePart: { id: 2345 },
        partType: 12,
        _isBike: true,
        _partType: partType,
      };
      const result = quotePartFields(quotePart, undefined, true);
      expect(result).toContainEqual(PART_TYPE_FIELD_DISABLED);
      expect(result).toContainEqual(NOT_REQUIRED_FIELD_DISABLED);
      expect(result).toContainEqual(TRADE_IN_PRICE_FIELD_DISABLED);
      expect(result).toContainEqual(partDescForType);
      expect(result).toContainEqual(updateObject(QUANTITY_FIELD, { required: true, default: '1' }));
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
        not_required: false,
        _completePart: { id: 2345 },
        partType: 12,
      };
      const expectedFields = [
        PART_TYPE_FIELD_DISABLED,
        NOT_REQUIRED_FIELD_DISABLED,
        TRADE_IN_PRICE_FIELD_DISABLED,
        partDescForType,
        updateObject(QUANTITY_FIELD, { required: true, default: '1' }),
        updateObject(PART_PRICE_FIELD, { required: true }),
        SUPPLIER_FIELD_OPTIONAL,
        attributesField,
      ];
      expect(quotePartFields(quotePart, undefined, true)).toEqual(expectedFields);
    });
  });
  describe('non bike quotePart', () => {
    it('should show disabled fields when no part type is present', () => {
      const expectedFields = [
        PART_TYPE_FIELD,
        PART_DESC_FIELD_DISABLED,
        QUANTITY_FIELD_DISABLED,
        PART_PRICE_FIELD_DISABLED,
        SUPPLIER_FIELD_DISABLED,
        ADDITIONAL_DATA_FIELD_DISABLED,
      ];
      expect(quotePartFields({})).toEqual(expectedFields);
    });
    it('should show disabled fields when no part is present', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const expectedFields = [
        PART_TYPE_FIELD,
        partDescForType,
        QUANTITY_FIELD_DISABLED,
        PART_PRICE_FIELD_DISABLED,
        SUPPLIER_FIELD_DISABLED,
        ADDITIONAL_DATA_FIELD_DISABLED,
      ];
      expect(quotePartFields({ _partType: partType })).toEqual(expectedFields);
    });
    it('should show enabled fields when a part is present', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        _partType: partType,
        id: 231,
        not_required: false,
        _completePart: { id: 2345 },
        partType: 12,
      };
      const expectedFields = [
        PART_TYPE_FIELD_DISABLED,
        partDescForType,
        updateObject(QUANTITY_FIELD, { required: true, default: '1' }),
        updateObject(PART_PRICE_FIELD, { required: false }),
        SUPPLIER_FIELD_OPTIONAL,
        attributesField,
      ];
      expect(quotePartFields(quotePart)).toEqual(expectedFields);
    });
    it('should show part price required when prices requested', () => {
      const partType = { id: 12, can_be_substituted: true, attributes: partTypeAttributes };
      const quotePart = {
        _partType: partType,
        id: 231,
        not_required: false,
        _completePart: { id: 2345 },
        partType: 12,
      };
      const expectedFields = [
        PART_TYPE_FIELD_DISABLED,
        partDescForType,
        updateObject(QUANTITY_FIELD, { required: true, default: '1' }),
        updateObject(PART_PRICE_FIELD, { required: true }),
        SUPPLIER_FIELD_OPTIONAL,
        attributesField,
      ];
      expect(quotePartFields(quotePart, undefined, true)).toEqual(expectedFields);
    });
  });
});
