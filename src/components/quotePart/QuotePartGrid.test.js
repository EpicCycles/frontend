import QuotePartGrid from './QuotePartGrid';
import { assertComponentHasExpectedProps } from '../../helpers/jest_helpers/assert';
import { QUOTE_PART_FOR_BIKE, QUOTE_PART_NON_BIKE } from './helpers/quotePartFields';
import React from 'react';

describe('QuotePartGrid', () => {
  it('should show headers and no parts when non bike quote no parts', () => {
    const component = shallow(
      <QuotePartGrid
        quoteParts={[]}
        updatedQuoteParts={[]}
        brands={[]}
        suppliers={[]}
        sections={[]}
        parts={[]}
        supplierProducts={[]}
        deleteQuotePart={jest.fn()}
        saveQuotePart={jest.fn()}
        raiseStateForQuotePart={jest.fn()}
      />,
    );
    expect(component.find('QuotePartEdit')).toHaveLength(0);
    const headers = component.find('ModelTableHeaderRow');
    expect(headers).toHaveLength(1);
    assertComponentHasExpectedProps(headers, {
      modelFields: QUOTE_PART_NON_BIKE,
    });
  });
  it('should show headers and no parts when bike quote no parts', () => {
    const component = shallow(
      <QuotePartGrid
        isBike
        quoteParts={[]}
        updatedQuoteParts={[]}
        brands={[]}
        suppliers={[]}
        sections={[]}
        parts={[]}
        supplierProducts={[]}
        deleteQuotePart={jest.fn()}
        saveQuotePart={jest.fn()}
        raiseStateForQuotePart={jest.fn()}
      />,
    );
    expect(component.find('QuotePartEdit')).toHaveLength(0);
    const headers = component.find('ModelTableHeaderRow');
    expect(headers).toHaveLength(1);
    assertComponentHasExpectedProps(headers, {
      modelFields: QUOTE_PART_FOR_BIKE,
    });
  });
  it('should show quote part when unmodified quopte part exists', () => {
    const quoteParts = [{ id: 1, omit: true }];
    const updatedQuoteParts = [];
    const component = shallow(
      <QuotePartGrid
        isBike
        quoteParts={quoteParts}
        updatedQuoteParts={updatedQuoteParts}
        brands={[]}
        suppliers={[]}
        sections={[]}
        parts={[]}
        supplierProducts={[]}
        deleteQuotePart={jest.fn()}
        saveQuotePart={jest.fn()}
        raiseStateForQuotePart={jest.fn()}
      />,
    );
    const parts = component.find('QuotePartEdit');
    expect(parts).toHaveLength(1);
    assertComponentHasExpectedProps(parts, {
      quotePart: quoteParts[0],
      persistedQuotePart: quoteParts[0],
    });
    const headers = component.find('ModelTableHeaderRow');
    expect(headers).toHaveLength(1);
    assertComponentHasExpectedProps(headers, {
      modelFields: QUOTE_PART_FOR_BIKE,
    });
  });
  it('should show quote part when modified quote part exists', () => {
    const quoteParts = [{ id: 1, omit: true }];
    const updatedQuoteParts = [{ id: 1, omit: true, tradeIn: 45.0 }];
    const component = shallow(
      <QuotePartGrid
        isBike
        quoteParts={quoteParts}
        updatedQuoteParts={updatedQuoteParts}
        brands={[]}
        suppliers={[]}
        sections={[]}
        parts={[]}
        supplierProducts={[]}
        deleteQuotePart={jest.fn()}
        saveQuotePart={jest.fn()}
        raiseStateForQuotePart={jest.fn()}
      />,
    );
    const parts = component.find('QuotePartEdit');
    expect(parts).toHaveLength(1);
    assertComponentHasExpectedProps(parts, {
      quotePart: updatedQuoteParts[0],
      persistedQuotePart: quoteParts[0],
    });
    const headers = component.find('ModelTableHeaderRow');
    expect(headers).toHaveLength(1);
    assertComponentHasExpectedProps(headers, {
      modelFields: QUOTE_PART_FOR_BIKE,
    });
  });
  it('should show all quote parts when modified quote part exists', () => {
    const quoteParts = [
      { id: 1, omit: true },
      { id: 12, omit: true },
      { id: 13, omit: true },
    ];
    const updatedQuoteParts = [{ id: 12, omit: true, tradeIn: 45 }];
    const component = shallow(
      <QuotePartGrid
        isBike
        quoteParts={quoteParts}
        updatedQuoteParts={updatedQuoteParts}
        brands={[]}
        suppliers={[]}
        sections={[]}
        parts={[]}
        supplierProducts={[]}
        deleteQuotePart={jest.fn()}
        saveQuotePart={jest.fn()}
        raiseStateForQuotePart={jest.fn()}
      />,
    );
    const parts = component.find('QuotePartEdit');
    expect(parts).toHaveLength(3);
    assertComponentHasExpectedProps(parts[0], {
      quotePart: quoteParts[0],
      persistedQuotePart: quoteParts[0],
    });
    assertComponentHasExpectedProps(parts[1], {
      quotePart: updatedQuoteParts[0],
      persistedQuotePart: quoteParts[1],
    });
    assertComponentHasExpectedProps(parts[2], {
      quotePart: quoteParts[2],
      persistedQuotePart: quoteParts[2],
    });
    const headers = component.find('ModelTableHeaderRow');
    expect(headers).toHaveLength(1);
    assertComponentHasExpectedProps(headers, {
      modelFields: QUOTE_PART_FOR_BIKE,
    });
  });
});
