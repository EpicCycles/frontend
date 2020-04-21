import UploadMappingSuppliers from '../UploadMappingSuppliers';

const foundName = 'find me';
const suppliers = [
  { id: 1, supplier_name: 'id is 1' },
  { id: 2, supplier_name: foundName },
  { id: 3, supplier_name: 'id is 3' },
];
const rowMappings = [
  { rowIndex: 1, supplierName: foundName },
  { rowIndex: 2, supplierName: 'id 11' },
  { rowIndex: 3, supplierName: 'id 11' },
  { rowIndex: 4, supplierName: 'id 111' },
  { rowIndex: 5, supplierName: 'id 234', ignore: true },
  { rowIndex: 6, supplierName: 'id 234', ignore: true },
  { rowIndex: 11, supplierName: foundName },
];
const saveSupplier = jest.fn();
const addDataAndProceed = jest.fn();

describe('UploadMappingSuppliers', () => {
  test('it renders', () => {
    const component = shallow(
      <UploadMappingSuppliers
        rowMappings={rowMappings}
        suppliers={suppliers}
        saveSupplier={saveSupplier}
        addDataAndProceed={addDataAndProceed}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  test('it sets up the supplierModal for a supplier', () => {
    const component = shallow(
      <UploadMappingSuppliers
        rowMappings={rowMappings}
        suppliers={suppliers}
        saveSupplier={saveSupplier}
        addDataAndProceed={addDataAndProceed}
      />,
    );
    expect(component.find('SupplierEdit')).toHaveLength(0);
    expect(component.find('[data-test="unmatchedSupplier"]')).toHaveLength(2);
    expect(component.find('[data-test="ignoredSupplier"]')).toHaveLength(1);
    component.find('#create1').prop('onClick')();

    expect(component.find('SupplierEdit')).toHaveLength(1);
    expect(component.find('SupplierEdit').prop('supplier')).toHaveProperty(
      'supplier_name',
      'id 111',
    );
  });
  test('it marks a discarded row as ignore', () => {
    const component = shallow(
      <UploadMappingSuppliers
        rowMappings={rowMappings}
        suppliers={suppliers}
        saveSupplier={saveSupplier}
        addDataAndProceed={addDataAndProceed}
      />,
    );
    expect(component.find('[data-test="unmatchedSupplier"]')).toHaveLength(2);
    expect(component.find('[data-test="ignoredSupplier"]')).toHaveLength(1);
    component.find('#delete0').prop('onClick')();
    expect(component.find('[data-test="unmatchedSupplier"]')).toHaveLength(1);
    expect(component.find('[data-test="ignoredSupplier"]')).toHaveLength(2);
  });
  test('it removes ignore when a row is removed from discard pile', () => {
    const component = shallow(
      <UploadMappingSuppliers
        rowMappings={rowMappings}
        suppliers={suppliers}
        saveSupplier={saveSupplier}
        addDataAndProceed={addDataAndProceed}
      />,
    );
    expect(component.find('[data-test="unmatchedSupplier"]')).toHaveLength(2);
    expect(component.find('[data-test="ignoredSupplier"]')).toHaveLength(1);
    component.find('#restore0').prop('onClick')();
    expect(component.find('[data-test="unmatchedSupplier"]')).toHaveLength(3);
    expect(component.find('[data-test="ignoredSupplier"]')).toHaveLength(0);
  });
  test('should populate with a selected supplier when option chosen', () => {
    const component = shallow(
      <UploadMappingSuppliers
        rowMappings={rowMappings}
        suppliers={suppliers}
        saveSupplier={saveSupplier}
        addDataAndProceed={addDataAndProceed}
      />,
    );
    expect(component.find('[data-test="unmatchedSupplier"]')).toHaveLength(2);
    expect(component.find('[data-test="ignoredSupplier"]')).toHaveLength(1);
    component
      .find('SupplierSelect')
      .at(0)
      .prop('onChange')('supplierName', '3');
    expect(component.find('[data-test="unmatchedSupplier"]')).toHaveLength(1);
    expect(component.find('[data-test="ignoredSupplier"]')).toHaveLength(1);
  });
  test('it calls passed method to save updated row mappings', () => {
    const component = shallow(
      <UploadMappingSuppliers
        rowMappings={rowMappings}
        suppliers={suppliers}
        saveSupplier={saveSupplier}
        addDataAndProceed={addDataAndProceed}
      />,
    );
    const rowMappingsExpected = [
      { rowIndex: 1, supplier: 2, supplierName: foundName },
      { rowIndex: 2, supplierName: 'id 11', supplier: 3, ignore: false },
      { rowIndex: 3, supplierName: 'id 11', supplier: 3, ignore: false },
      { rowIndex: 4, supplierName: 'id 111', ignore: true },
      { rowIndex: 5, supplierName: 'id 234', ignore: true },
      { rowIndex: 6, supplierName: 'id 234', ignore: true },
      { rowIndex: 11, supplier: 2, supplierName: foundName },
    ];

    expect(component.find('Button').prop('disabled')).toBeTruthy();
    component
      .find('SupplierSelect')
      .at(0)
      .prop('onChange')('supplierSelect', '3');
    expect(component.find('Button').prop('disabled')).toBeTruthy();
    component.find('#delete0').prop('onClick')();
    expect(component.find('Button').prop('disabled')).toBeFalsy();

    component.find('Button').prop('onClick')();
    expect(addDataAndProceed).toHaveBeenCalledWith({ rowMappings: rowMappingsExpected });
  });
});
