import React from 'react';
import QuoteIssue from './QuoteIssue';
import { QUOTE_INITIAL } from './helpers/quote';

describe('QuoteIssue', () => {
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
  it('should render message only when no part type data', () => {
    const component = shallow(
      <QuoteIssue
        quoteId={1}
        quotes={[{ id: 1, quote_status: QUOTE_INITIAL }]}
        quoteParts={[]}
        brands={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
        bikes={[]}
      />,
    );
    expect(component.find('QuoteDetail')).toHaveLength(1);
    expect(component.find('QuoteActionCell')).toHaveLength(1);
  });
});
