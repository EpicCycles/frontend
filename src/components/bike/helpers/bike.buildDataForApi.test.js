import { buildDataForApi } from './bike';

test('single bike, part and attribute set', () => {
  const brand = 1;
  const frameName = 'Frame thing';
  const rowMappings = [
    { rowIndex: 0, partTypeName: 'sizes', bikeAttribute: 'sizes' },
    { rowIndex: 1, partTypeName: 'frame', partType: 12 },
    { rowIndex: 2, partTypeName: 'mudguards', ignore: true },
  ];
  const uploadedHeaders = ['', 'Bike1'];
  const uploadedData = [
    ['sizes', '52, 54, 56'],
    ['frame', 'Frame description'],
    ['mudguards', 'included'],
  ];
  const expectedData = {
    brand: brand,
    frame_name: frameName,
    bikes: [
      {
        model_name: uploadedHeaders[1],
        sizes: uploadedData[0][1],
        bikeParts: JSON.stringify([
          {
            id: rowMappings[1].partType,
            partType: rowMappings[1].partType,
            partName: uploadedData[1][1],
          },
        ]),
      },
    ],
  };
  expect(buildDataForApi(brand, frameName, rowMappings, uploadedHeaders, uploadedData)).toEqual(
    expectedData,
  );
});
test('multiple bikes, parts and attributes set', () => {
  const brand = 1;

  const frameName = 'Frame thing';
  const rowMappings = [
    { rowIndex: 0, partTypeName: 'sizes', bikeAttribute: 'sizes' },
    { rowIndex: 1, partTypeName: 'frame', partType: 12 },
    { rowIndex: 2, partTypeName: 'mudguards', ignore: true },
    { rowIndex: 3, partTypeName: 'description', bikeAttribute: 'description' },
    { rowIndex: 4, partTypeName: 'Bottom bracket', partType: 14 },
  ];
  const uploadedHeaders = ['', 'Bike1', 'Bike21', 'Bike31'];
  const uploadedData = [
    ['sizes', '52, 54, 56'],
    ['frame', 'Frame description 1', 'Frame description 2'],
    ['mudguards', 'included', '', ''],
    ['description', 'bike 1 desc', '', 'bike 3 desc', 'bike 4 ignored'],
    ['Bottom bracket', '', 'WellGo Push fit 2', 'Well Push fit 3'],
  ];
  const expectedData = {
    brand: brand,
    frame_name: frameName,
    bikes: [
      {
        model_name: uploadedHeaders[1],
        sizes: uploadedData[0][1],
        description: uploadedData[3][1],
        bikeParts: JSON.stringify([
          {
            id: rowMappings[1].partType,
            partType: rowMappings[1].partType,
            partName: uploadedData[1][1],
          },
        ]),
      },
      {
        model_name: uploadedHeaders[2],
        bikeParts: JSON.stringify([
          {
            id: rowMappings[1].partType,
            partType: rowMappings[1].partType,
            partName: uploadedData[1][2],
          },
          {
            id: rowMappings[4].partType,
            partType: rowMappings[4].partType,
            partName: uploadedData[4][2],
          },
        ]),
      },
      {
        model_name: uploadedHeaders[3],
        description: uploadedData[3][3],
        bikeParts: JSON.stringify([
          {
            id: rowMappings[4].partType,
            partType: rowMappings[4].partType,
            partName: uploadedData[4][3],
          },
        ]),
      },
    ],
  };
  expect(buildDataForApi(brand, frameName, rowMappings, uploadedHeaders, uploadedData)).toEqual(
    expectedData,
  );
});
