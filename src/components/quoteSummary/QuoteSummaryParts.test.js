import React from 'react';
import QuoteSummaryParts from "./QuoteSummaryParts";
import {findDataTest} from "../../helpers/jest_helpers/assert";

describe('QuoteSummaryParts', () => {
    const sections = [
        {
            id: 1,
            partTypes: [{ id: 1 }, { id: 2 }]
        },
        {
            id: 2,
            partTypes: [{ id: 21 }, { id: 22 }]
        },
    ]
    it('should render message only when no part type data', () => {
        const component = shallow(<QuoteSummaryParts
            quoteParts={[]}
            brands={[]}
            sections={sections}
            parts={[]}
            bikeParts={[]}
        />);
        expect(findDataTest(component, 'no-summary')).toHaveLength(1);
        expect(findDataTest(component, 'quote-summary-headers')).toHaveLength(0);
        expect(component.find('QuoteSummaryPartType')).toHaveLength(0);
    });
    it('should render headers and detail when there is part type data', () => {
        const component = shallow(<QuoteSummaryParts
            quoteParts={[{ quote: 1, partType: 1, part: 16 }]}
            brands={[]}
            sections={sections}
            parts={[]}
            bikeParts={[]}
        />);
        expect(findDataTest(component, 'no-summary')).toHaveLength(0);
        expect(findDataTest(component, 'quote-summary-headers')).toHaveLength(1);
        expect(component.find('QuoteSummaryPartType')).toHaveLength(1);
    });
    it('should render headers and all section detail when there is part type data', () => {
        const component = shallow(<QuoteSummaryParts
            quoteParts={[{ quote: 1, partType: 1, part:16 }, { quote: 1, partType: 22, part:26 }]}
            brands={[]}
            sections={sections}
            parts={[]}
            bikeParts={[]}
        />);
        expect(findDataTest(component, 'no-summary')).toHaveLength(0);
        expect(findDataTest(component, 'quote-summary-headers')).toHaveLength(1);
        expect(component.find('QuoteSummaryPartType')).toHaveLength(2);
    });
});