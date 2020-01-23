import QuoteGrid from './QuoteGrid';
import { quoteFields } from './helpers/quoteFields';
import React from 'react';
import { QUOTE_ARCHIVED, QUOTE_ISSUED } from './helpers/quote';
import { findDataTest } from '../../helpers/jest_helpers/assert';

describe('QuoteGrid', () => {
  it('should show just headers when no quotes', () => {
    const quotes = [];
    const component = shallow(<QuoteGrid displayFields={quoteFields({})} quotes={quotes} />);
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('ViewModel')).toHaveLength(0);
  });
  it('should show archived quotes separately when they exist', () => {
    const quotes = [
      { id: 1, quote_status: QUOTE_ISSUED },
      { id: 1, quote_status: QUOTE_ARCHIVED },
    ];
    const component = shallow(<QuoteGrid displayFields={quoteFields({})} quotes={quotes} />);
    expect(component.find('ModelTableHeaderRow')).toHaveLength(1);
    expect(component.find('ViewModel')).toHaveLength(2);
    expect(findDataTest(component, 'quote-row')).toHaveLength(1);
    expect(findDataTest(component, 'archived-quote-row')).toHaveLength(1);
  });
});
