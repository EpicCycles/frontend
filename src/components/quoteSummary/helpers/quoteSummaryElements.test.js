import { quoteSummaryElements } from './quoteSummaryElements';
import { sampleBrands } from '../../../helpers/sampleData';

describe('quoteSummaryElements', () => {
  const sections = [
    {
      id: 1,
      name: 'First Section',
      partTypes: [
        { id: 1, name: 'PT 1' },
        { id: 2, name: 'PT 2' },
      ],
    },
    {
      id: 2,
      name: 'second Section',
      partTypes: [
        { id: 21, name: 'PT 21', customer_visible: true },
        { id: 22, name: 'PT 22' },
      ],
    },
  ];
  const charges = [
    { id: 2, charge_name: 'Charge 2' },
    { id: 21, charge_name: 'Charge 21' },
    { id: 1, charge_name: 'Charge 1' },
  ];
  it('should return an empty array when no data exists', () => {
    const parts = [];
    const brands = [];
    const charges = [];
    const showPrices = false;
    const customerView = false;
    const expectedResults = [];
    expect(
      quoteSummaryElements({}, sections, [], parts, brands, charges, showPrices, customerView),
    ).toEqual(expectedResults);
  });
  it('should return customer visible bike parts when that is all there is', () => {
    const quote = { id: 32, bike: 52 };
    const bikeParts = [
      { id: 1, partType: 1, partName: 'Brand 5 Not visible' },
      { id: 2, partType: 21, partName: 'Brand 5 visible' },
    ];
    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
    ];
    const brands = sampleBrands;
    const showPrices = false;
    const customerView = true;
    const expectedResults = [
      {
        dummyKey: 'bp_2',
        sectionName: 'second Section',
        partTypeName: 'PT 21',
        part_desc: 'Brand 5 visible',
      },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
  it('should return all bike parts when it is not a customer view', () => {
    const quote = { id: 32, bike: 52 };
    const bikeParts = [
      { id: 1, partType: 1, partName: 'Brand 5 Not visible' },
      { id: 3, partType: 2, partName: 'Brand 5 Not visible 2' },
      { id: 2, partType: 21, partName: 'Brand 5 visible' },
    ];
    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
      { id: 3, partType: 2, brand: 5, part_name: 'Not visible 2' },
    ];
    const brands = sampleBrands;
    const showPrices = false;
    const customerView = false;
    const expectedResults = [
      {
        dummyKey: 'bp_1',
        sectionName: 'First Section',
        partTypeName: 'PT 1',
        part_desc: 'Brand 5 Not visible',
      },
      {
        dummyKey: 'bp_3',
        sectionName: '',
        partTypeName: 'PT 2',
        part_desc: 'Brand 5 Not visible 2',
      },
      {
        dummyKey: 'bp_2',
        sectionName: 'second Section',
        partTypeName: 'PT 21',
        part_desc: 'Brand 5 visible',
      },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
  it('should show additional quote parts when they exist', () => {
    const quote = {
      id: 32,
      bike: 52,
      parts: [
        {
          id: 321,
          quote: 32,
          partType: 2,
          part: 121,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
        },
      ],
    };
    const bikeParts = [
      { id: 1, partType: 1, partName: 'Brand 5 Not visible' },
      { id: 3, partType: 2, partName: 'Brand 5 Not visible 2' },
      { id: 2, partType: 21, partName: 'Brand 5 visible' },
    ];

    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
      { id: 3, partType: 2, brand: 5, part_name: 'Not visible 2' },
      { id: 121, partType: 2, brand: 5, part_name: 'alternate' },
    ];
    const brands = sampleBrands;
    const showPrices = false;
    const customerView = false;
    const expectedResults = [
      {
        dummyKey: 'bp_1',
        sectionName: 'First Section',
        partTypeName: 'PT 1',
        part_desc: 'Brand 5 Not visible',
      },
      {
        dummyKey: 'bp_3',
        sectionName: '',
        partTypeName: 'PT 2',
        part_desc: 'Brand 5 Not visible 2',
      },
      {
        id: 321,
        dummyKey: 'qp_321',
        quote: 32,
        partType: 2,
        part: 121,
        sectionName: '',
        partTypeName: '',
        part_desc: '**** hbrand5 alternate (qty 2) ****',
        quantity: 2,
        part_price: undefined,
        total_price: undefined,
        trade_in_price: undefined,
      },
      {
        dummyKey: 'bp_2',
        sectionName: 'second Section',
        partTypeName: 'PT 21',
        part_desc: 'Brand 5 visible',
      },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
  it('should show additional quote parts when they exist as fixed price', () => {
    const quote = {
      id: 32,
      bike: 52,
      parts: [
        {
          id: 321,
          quote: 32,
          partType: 2,
          part: 121,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
        },
        {
          id: 322,
          quote: 32,
          partType: 2,
          part: 122,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
          fixed_price: true,
        },
      ],
    };
    const bikeParts = [
      { id: 1, partType: 1, partName: 'Brand 5 Not visible' },
      { id: 3, partType: 2, partName: 'Brand 5 Not visible 2' },
      { id: 2, partType: 21, partName: 'Brand 5 visible' },
    ];
    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
      { id: 3, partType: 2, brand: 5, part_name: 'Not visible 2' },
      { id: 121, partType: 2, brand: 5, part_name: 'alternate' },
      { id: 122, partType: 2, brand: 5, part_name: 'fixed' },
    ];
    const brands = sampleBrands;
    const showPrices = false;
    const customerView = false;
    const expectedResults = [
      {
        dummyKey: 'bp_1',
        sectionName: 'First Section',
        partTypeName: 'PT 1',
        part_desc: 'Brand 5 Not visible',
      },
      {
        dummyKey: 'bp_3',
        sectionName: '',
        partTypeName: 'PT 2',
        part_desc: 'Brand 5 Not visible 2',
      },
      {
        id: 321,
        dummyKey: 'qp_321',
        quote: 32,
        partType: 2,
        part: 121,
        sectionName: '',
        partTypeName: '',
        part_desc: '**** hbrand5 alternate (qty 2) ****',
        quantity: 2,
        part_price: undefined,
        total_price: undefined,
        trade_in_price: undefined,
      },
      {
        id: 322,
        dummyKey: 'qp_322',
        sectionName: '',
        partTypeName: '',
        fixed_price: true,
        quote: 32,
        partType: 2,
        part: 122,
        quantity: 2,
        part_desc: '**** hbrand5 fixed (qty 2) ****',
        part_price: 120.0,
        total_price: 240.0,
      },
      {
        dummyKey: 'bp_2',
        sectionName: 'second Section',
        partTypeName: 'PT 21',
        part_desc: 'Brand 5 visible',
      },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
  it('should show additional parts separately when fixed price on customer view', () => {
    const quote = {
      id: 32,
      bike: 52,
      parts: [
        {
          id: 321,
          quote: 32,
          partType: 2,
          part: 121,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
        },
        {
          id: 322,
          quote: 32,
          partType: 2,
          part: 122,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
          fixed_price: true,
        },
      ],
    };
    const bikeParts = [
      { id: 1, partType: 1, partName: 'Brand 5 Not visible' },
      { id: 3, partType: 2, partName: 'Brand 5 Not visible 2' },
      { id: 2, partType: 21, partName: 'Brand 5 visible' },
    ];

    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
      { id: 3, partType: 2, brand: 5, part_name: 'Not visible 2' },
      { id: 121, partType: 2, brand: 5, part_name: 'alternate' },
      { id: 122, partType: 2, brand: 5, part_name: 'fixed' },
    ];
    const brands = sampleBrands;
    const showPrices = false;
    const customerView = true;
    const expectedResults = [
      {
        sectionName: 'First Section',
        partTypeName: 'PT 2',
        id: 321,
        dummyKey: 'qp_321',
        quote: 32,
        partType: 2,
        part: 121,
        part_desc: '**** hbrand5 alternate (qty 2) ****',
        quantity: 2,
        part_price: undefined,
        total_price: undefined,
        trade_in_price: undefined,
      },
      {
        dummyKey: 'bp_2',
        sectionName: 'second Section',
        partTypeName: 'PT 21',
        part_desc: 'Brand 5 visible',
      },
      { sectionName: 'Itemised changes', dummyKey: 'qp_itemised' },
      {
        id: 322,
        dummyKey: 'qp_322',
        sectionName: 'First Section',
        partTypeName: 'PT 2',
        fixed_price: true,
        quote: 32,
        partType: 2,
        part: 122,
        quantity: 2,
        part_desc: '**** hbrand5 fixed (qty 2) ****',
        part_price: 120.0,
        total_price: 240.0,
      },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
  it('should show alternative quote parts when they exist', () => {
    const quote = {
      id: 32,
      bike: 52,
      parts: [
        {
          id: 321,
          quote: 32,
          not_required: true,
          trade_in_price: 12,
          partType: 2,
          part: 121,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
        },
      ],
    };
    const bikeParts = [
      { id: 1, partType: 1, partName: 'Brand 5 Not visible' },
      { id: 3, partType: 2, partName: 'Brand 5 Not visible 2' },
      { id: 2, partType: 21, partName: 'Brand 5 visible' },
    ];
    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
      { id: 3, partType: 2, brand: 5, part_name: 'Not visible 2' },
      { id: 121, partType: 2, brand: 5, part_name: 'alternate' },
    ];

    const brands = sampleBrands;
    const charges = [];
    const showPrices = true;
    const customerView = false;
    const expectedResults = [
      {
        dummyKey: 'bp_1',
        sectionName: 'First Section',
        partTypeName: 'PT 1',
        part_desc: 'Brand 5 Not visible',
      },
      {
        id: 321,
        dummyKey: 'qp_321',
        quote: 32,
        sectionName: '',
        partTypeName: 'PT 2',
        part_desc: '**** hbrand5 alternate (qty 2) ****',
        not_required: true,
        trade_in_price: 12,
        partType: 2,
        part: 121,
        quantity: 2,
        part_price: 120.0,
        total_price: 240.0,
      },
      {
        dummyKey: 'bp_2',
        sectionName: 'second Section',
        partTypeName: 'PT 21',
        part_desc: 'Brand 5 visible',
      },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
  it('should show alternative quote parts when they exist as fixed', () => {
    const quote = {
      id: 32,
      bike: 52,
      parts: [
        {
          id: 321,
          quote: 32,
          not_required: true,
          fixed_price: true,
          trade_in_price: 12,
          partType: 2,
          part: 121,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
        },
      ],
    };
    const bikeParts = [
      { id: 1, partType: 1, partName: 'Brand 5 Not visible' },
      { id: 3, partType: 2, partName: 'Brand 5 Not visible 2' },
      { id: 2, partType: 21, partName: 'Brand 5 visible' },
    ];
    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
      { id: 3, partType: 2, brand: 5, part_name: 'Not visible 2' },
      { id: 121, partType: 2, brand: 5, part_name: 'alternate' },
    ];

    const brands = sampleBrands;
    const showPrices = true;
    const customerView = false;
    const expectedResults = [
      {
        sectionName: 'First Section',
        partTypeName: 'PT 1',
        part_desc: 'Brand 5 Not visible',
        dummyKey: 'bp_1',
      },
      {
        id: 321,
        dummyKey: 'qp_321',
        quote: 32,
        fixed_price: true,
        sectionName: '',
        partTypeName: 'PT 2',
        part_desc: '**** hbrand5 alternate (qty 2) ****',
        not_required: true,
        trade_in_price: 12,
        partType: 2,
        part: 121,
        quantity: 2,
        part_price: 120.0,
        total_price: 240.0,
      },
      {
        dummyKey: 'bp_2',
        sectionName: 'second Section',
        partTypeName: 'PT 21',
        part_desc: 'Brand 5 visible',
      },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
  it('should show a non bike quote when there are parts', () => {
    const quote = {
      id: 32,
      parts: [
        {
          id: 321,
          quote: 32,
          fixed_price: true,
          trade_in_price: 12,
          partType: 2,
          part: 121,
          quantity: 2,
          part_price: 120.0,
          total_price: 240.0,
        },
      ],
      charges: [
        { id: 1, quote: 32, charge: 1, price: 400 },
        { id: 3, quote: 32, charge: 21, price: 150 },
      ],
    };
    const bikeParts = [];
    const parts = [
      { id: 1, partType: 1, brand: 5, part_name: 'Not visible' },
      { id: 2, partType: 21, brand: 5, part_name: 'visible' },
      { id: 3, partType: 2, brand: 5, part_name: 'Not visible 2' },
      { id: 121, partType: 2, brand: 5, part_name: 'alternate' },
    ];

    const brands = sampleBrands;
    const showPrices = true;
    const customerView = true;
    const expectedResults = [
      { sectionName: 'Itemised changes', dummyKey: 'qp_itemised' },
      {
        id: 321,
        dummyKey: 'qp_321',
        quote: 32,
        fixed_price: true,
        sectionName: 'First Section',
        partTypeName: 'PT 2',
        part_desc: '**** hbrand5 alternate (qty 2) ****',
        trade_in_price: 12,
        partType: 2,
        part: 121,
        quantity: 2,
        part_price: 120.0,
        total_price: 240.0,
      },
      { dummyKey: 'qc_blank' },
      {
        dummyKey: 'qc_1',
        sectionName: 'Additional Costs',
        partTypeName: 'Charge 1',
        total_price: 400,
      },
      { dummyKey: 'qc_3', sectionName: '', partTypeName: 'Charge 21', total_price: 150 },
    ];
    expect(
      quoteSummaryElements(
        quote,
        sections,
        bikeParts,
        parts,
        brands,
        charges,
        showPrices,
        customerView,
      ),
    ).toEqual(expectedResults);
  });
});
