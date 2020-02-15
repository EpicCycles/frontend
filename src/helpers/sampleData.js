export const sampleBrands = [
  { brand_name: 'sbrand1', supplier: 1, id: 1 },
  { brand_name: 'abrand2', supplier: 1, id: 2 },
  { brand_name: 'dbrand3', supplier: 1, id: 3 },
  { brand_name: 'fbrand4', supplier: 1, id: 4 },
  { brand_name: 'hbrand5', supplier: 1, id: 5 },
  { brand_name: 'jbrand6', supplier: 2, id: 6 },
  { brand_name: 'kbrand7', supplier: 2, id: 7 },
  { brand_name: 'Bianchi', link: 'https://bianchi.co.uk', id: 8 },
  { brand_name: 'rbrand1', supplier: 1, id: 11 },
  { brand_name: 'brand2', supplier: 1, id: 12 },
  { brand_name: 'brand3', supplier: 1, id: 13 },
  { brand_name: 'brand4', supplier: 1, id: 14 },
  { brand_name: 'brand5', supplier: 1, id: 15 },
  { brand_name: 'brand6', supplier: 2, id: 16 },
  { brand_name: 'brand7', supplier: 12, id: 17 },
  { brand_name: 'brand8', link: 'https://bianchi.co.uk', id: 18 },
];
export const sampleFrames = [
  {
    id: 14,
    brand_name: 'Haibike',
    frame_name: 'Trekking',
    archived: false,
    archived_date: null,
    brand: 3,
  },
  {
    id: 13,
    brand_name: 'Haibike',
    frame_name: 'Urban',
    archived: false,
    archived_date: null,
    brand: 3,
  },
  {
    id: 27,
    brand_name: 'Raleigh',
    frame_name: 'Motus',
    archived: false,
    archived_date: null,
    brand: 4,
  },
];

export const sampleBikes = [
  {
    id: 58,
    frame_name: 'Haibike: Trekking',
    model_name: '4',
    description: null,
    colours: 'anthracite/black/lime',
    rrp: null,
    epic_price: null,
    club_price: 2249.0,
    sizes: null,
    frame: 14,
    bikeParts: [{ partType: 1 }, { partType: 22 }],
  },
  {
    id: 59,
    frame_name: 'Haibike: Trekking',
    model_name: '4 low-step',
    description: null,
    colours: 'anthracite/black/lime',
    rrp: null,
    epic_price: null,
    club_price: 2249.0,
    sizes: null,
    frame: 14,
    bikeParts: [],
  },
  {
    id: 60,
    frame_name: 'Haibike: Trekking',
    model_name: '5',
    description: null,
    colours: 'black/blue/white matt',
    rrp: null,
    epic_price: null,
    club_price: 2549.0,
    sizes: null,
    frame: 14,
    bikeParts: [],
  },
];
export const sampleSuppliers = [
  { supplier_name: 'Supplier1', id: 1 },
  { supplier_name: 'Supplier2fdg', id: 2 },
  { supplier_name: 'Supplier3 dfgdfg', id: 3 },
  { supplier_name: 'Supplier3 dfgdfg', id: 4 },
  { supplier_name: 'Supplier3 dfgdfg', id: 5 },
  { supplier_name: 'Supplier3', id: 6 },
  { supplier_name: 'Supplier3 dfgdfg', id: 7 },
  { supplier_name: 'Supplier3', id: 8 },
  { supplier_name: 'Supplier3 sdfgsdg', id: 9 },
  { supplier_name: 'Supplier3 dsdfg', id: 10 },
  { supplier_name: 'Supplier3 dsgdsg', id: 11 },
  { supplier_name: 'Supplier3 sdfgs', id: 12 },
  { supplier_name: 'Supplier3 sdgfsdfg', id: 13 },
  { supplier_name: 'Supplier3 sgsdf', id: 14 },
];
export const partType1 = {
  id: 1,
  attributes: [
    {
      id: 1,
      options: [],
      attribute_name: 'Size',
      in_use: true,
      mandatory: true,
      placing: 10,
      attribute_type: '1',
      partType: 1,
    },
  ],
  synonyms: [],
  name: 'Frame',
  placing: 10,
  can_be_substituted: true,
  can_be_omitted: false,
  customer_facing: false,
  includeInSection: 1,
};
export const partType2 = {
  id: 2,
  attributes: [],
  synonyms: [
    {
      id: 1,
      name: 'Front Fork',
      partType: 2,
    },
  ],
  name: 'Fork',
  placing: 20,
  can_be_substituted: false,
  can_be_omitted: true,
  customer_facing: false,
  includeInSection: 1,
};
export const partType3 = {
  id: 3,
  attributes: [],
  synonyms: [],
  name: 'Headset',
  placing: 30,
  can_be_substituted: false,
  can_be_omitted: false,
  customer_facing: true,
  includeInSection: 1,
};
export const partType4 = {
  id: 4,
  attributes: [],
  synonyms: [],
  name: 'Wheels',
  placing: 30,
  can_be_substituted: false,
  can_be_omitted: false,
  customer_facing: true,
  includeInSection: 2,
};
export const sampleSections = [
  {
    id: 1,
    name: 'Frameset',
    placing: 10,
    partTypes: [partType1, partType2, partType3],
  },
  {
    id: 2,
    name: 'Finishing kit',
    placing: 20,
    partTypes: [partType4],
  },
];
