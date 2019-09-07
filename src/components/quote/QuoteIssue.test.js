import React from 'react';
import QuoteIssue from './QuoteIssue';
import { QUOTE_INITIAL, QUOTE_ISSUED } from './helpers/quote';

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
  it('should quote detail when the quote has status initial', () => {
    const component = shallow(
      <QuoteIssue
        quoteId={1}
        quotes={[{ id: 1, quote_status: QUOTE_INITIAL }]}
        quoteParts={[]}
        brands={[]}
        charges={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
        bikes={[]}
      />,
    );
    expect(component.find('QuoteDetail')).toHaveLength(1);
  });
  it('should redirect when the quote is bit status initial', () => {
    const component = shallow(
      <QuoteIssue
        quoteId={1}
        quotes={[{ id: 1, quote_status: QUOTE_ISSUED }]}
        quoteParts={[]}
        brands={[]}
        charges={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
        bikes={[]}
      />,
    );
    expect(component.find('QuoteDetail')).toHaveLength(0);
    expect(component.find('Redirect')).toHaveLength(1);
  });
  it('should redirect when the quote is not found', () => {
    const component = shallow(
      <QuoteIssue
        quoteId={2}
        quotes={[{ id: 1, quote_status: QUOTE_ISSUED }]}
        quoteParts={[]}
        brands={[]}
        charges={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
        bikes={[]}
      />,
    );
    expect(component.find('QuoteDetail')).toHaveLength(0);
    expect(component.find('Redirect')).toHaveLength(1);
  });
  it('should redirect when no quote id is passed', () => {
    const component = shallow(
      <QuoteIssue
        quotes={[{ id: 1, quote_status: QUOTE_ISSUED }]}
        quoteParts={[]}
        brands={[]}
        charges={[]}
        sections={sections}
        parts={[]}
        bikeParts={[]}
        bikes={[]}
      />,
    );
    expect(component.find('QuoteDetail')).toHaveLength(0);
    expect(component.find('Redirect')).toHaveLength(1);
  });
});
