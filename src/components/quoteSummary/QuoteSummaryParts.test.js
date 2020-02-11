import React from 'react';
import QuoteSummaryParts from './QuoteSummaryParts';
import { findDataTest } from '../../helpers/jest_helpers/assert';

jest.mock('./helpers/quoteSummaryElements');
const { quoteSummaryElements } = require('./helpers/quoteSummaryElements');

describe('QuoteSummaryParts', () => {
  const sections = [
    {
      id: 1,
      partTypes: [{ id: 1 }, { id: 2 }],
    },
    {
      id: 2,
      partTypes: [{ id: 21 }, { id: 22 }],
    },
  ];
  const qouteWithData = { id: 1 };
  beforeEach(() => {
    quoteSummaryElements.mockImplementation(
      (
        quote,
        sections,
        bikeParts,
        quoteParts,
        parts,
        brands,
        quoteCharges,
        charges,
        showPrices,
        customerView,
      ) => {
        if (quote && quote.id === 1) return [{ id: 21 }, { id: 22 }];
        return [];
      },
    );
  });
  afterEach(() => {
    quoteSummaryElements.mockClear();
  });
  it('should render message only when no part type data', () => {
    const component = shallow(
      <QuoteSummaryParts
        quote={{}}
        quoteParts={[]}
        brands={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
      />,
    );
    expect(findDataTest(component, 'no-summary')).toHaveLength(1);
    expect(component.find('ModelTable')).toHaveLength(0);
  });
  it('should render headers and detail when there is part type data', () => {
    const component = shallow(
      <QuoteSummaryParts
        quote={qouteWithData}
        quoteParts={[{ quote: 1, partType: 1, part: 16 }]}
        brands={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
      />,
    );
    expect(findDataTest(component, 'no-summary')).toHaveLength(0);
    expect(component.find('ModelTable')).toHaveLength(1);
  });
  it('should render headers and all section detail when there is part type data', () => {
    const component = shallow(
      <QuoteSummaryParts
        quote={qouteWithData}
        quoteParts={[
          { quote: 1, partType: 1, part: 16 },
          { quote: 1, partType: 22, part: 26 },
        ]}
        brands={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
      />,
    );
    expect(findDataTest(component, 'no-summary')).toHaveLength(0);
    expect(component.find('ModelTable')).toHaveLength(1);
  });
});
