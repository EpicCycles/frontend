import { copyToNewQuote } from './copyToNewQuote';
import { sampleBrands, sampleFrames } from '../../../helpers/sampleData';
import { formattedDate } from '../../app/model/helpers/display';

describe('copyToNewQuote', () => {
  const bikeQuote = {
    id: 23,
    customer: 12,
    bike: 58,
    version: 1,
    quoteParts: [{ partType: 1, omit: true, tradeIn: 34, qty: 1, price: 100 }],
  };
  const bikeQuoteWithCharges = {
    id: 23,
    customer: 12,
    bike: 58,
    version: 1,
    quoteParts: [{ partType: 1, omit: true, tradeIn: 34, qty: 1, price: 100 }],
    charges: [{ charge: 21, price: 30, id: 1 }],
  };
  const bike58 = {
    id: 58,
    frame_name: 'Haibike: Trekking',
    model_name: '4',
    description: null,
    colours: 'anthracite/black/lime',
    rrp: 3300,
    epic_price: 2300,
    club_price: 2249.0,
    sizes: null,
    frame: 14,
    bikeParts: [{ partType: 1 }, { partType: 22 }],
  };
  const bike59 = {
    id: 59,
    frame_name: 'Haibike: Trekking',
    model_name: '4 low-step',
    description: null,
    colours: 'anthracite/black/lime',
    rrp: 2800,
    epic_price: 2500,
    club_price: 2249.0,
    sizes: null,
    frame: 14,
    bikeParts: [],
  };
  it('should up the version and copy details when bike quote and same bike and customer', () => {
    const expectedQuote = {
      id: undefined,
      customer: 12,
      bike: 58,
      version: 2,
      quoteParts: [{ partType: 1, omit: true, tradeIn: 34, qty: 1, price: 100 }],
    };
    expect(
      copyToNewQuote(bikeQuote, { id: 12, name: 'bill' }, bike58, sampleFrames, sampleBrands, []),
    ).toEqual(expectedQuote);
  });
  it('should reset customer data when customer changes', () => {
    const expectedQuote = {
      id: undefined,
      customer: 12,
      bike: 59,
      bike_price: 2500,
      calculated_price: 2600,
      fixed_price_total: 0,
      charges_total: 0,
      quote_desc: `bill Bloggs/Haibike: Trekking 4 low-step - ${formattedDate(new Date())}`,
      quote_price: undefined,
      total_price: 2600,
      version: 1,
      quoteParts: [
        { total_price: 100, partType: 1, omit: false, tradeIn: undefined, qty: 1, price: 100 },
      ],
      charges: [],
      answers: [],
    };
    expect(
      copyToNewQuote(
        bikeQuote,
        { id: 12, first_name: 'bill', last_name: 'Bloggs' },
        bike59,
        sampleFrames,
        sampleBrands,
        [],
      ),
    ).toEqual(expectedQuote);
  });
});
