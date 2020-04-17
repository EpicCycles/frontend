import SupplierEdit from './SupplierEdit';

describe('SupplierEdit', () => {
  it('displays correctly for new supplier', () => {
    const component = shallow(<SupplierEdit />);
    expect(toJson(component)).toMatchSnapshot();
  });
  it('displays correctly for existing supplier', () => {
    const supplier = {
      id: 1,
      supplier_name: 'supplier name',
      brand_names: ['brands 1', 'brand 2', 'brand 3'],
      link: 'http://supplier.co.uk',
      preferred_supplier: false,
    };
    const component = shallow(<SupplierEdit supplier={supplier} />);
    expect(toJson(component)).toMatchSnapshot();
  });
  it('displays correctly for existing supplier as a modal dialogue', () => {
    const supplier = {
      id: 1,
      supplier_name: 'supplier name',
      brand_names: ['brands 1', 'brand 2', 'brand 3'],
      link: 'http://supplier.co.uk',
      preferred_supplier: false,
    };
    const closeModal = jest.fn();
    const component = shallow(<SupplierEdit supplier={supplier} closeModal={closeModal} />);
    expect(toJson(component)).toMatchSnapshot();
  });
  it('save for existing supplier saves all changes', () => {
    const saveSupplier = jest.fn();
    const closeModal = jest.fn();
    const supplier = {
      id: 1,
      supplier_name: 'supplier name',
      brand_names: ['brands 1', 'brand 2', 'brand 3'],
      link: 'http://supplier.co.uk',
      preferred_supplier: false,
    };
    const component = shallow(
      <SupplierEdit supplier={supplier} saveSupplier={saveSupplier} closeModal={closeModal} />,
    );
    component.find('EditModel').prop('modelSave')(supplier);

    expect(saveSupplier.mock.calls).toHaveLength(1);
    expect(closeModal.mock.calls).toHaveLength(1);
    expect(saveSupplier.mock.calls[0][0]).toBe(supplier);
  });
  it('save for new supplier saves all changes', () => {
    const saveSupplier = jest.fn();
    const closeModal = jest.fn();
    const supplier = {};
    const supplierToSave = {
      supplier_name: 'supplier name',
      brand_names: ['brands 1', 'brand 2', 'brand 3'],
      link: 'http://supplier.co.uk',
      preferred_supplier: false,
    };
    const component = shallow(
      <SupplierEdit supplier={supplier} saveSupplier={saveSupplier} closeModal={closeModal} />,
    );

    component.find('EditModel').prop('modelSave')(supplierToSave);

    expect(saveSupplier.mock.calls).toHaveLength(1);
    expect(closeModal.mock.calls).toHaveLength(1);
    expect(saveSupplier.mock.calls[0][0]).toBe(supplierToSave);
  });
  it('delete for existing supplier calls passed method', () => {
    const deleteSupplier = jest.fn();
    const closeModal = jest.fn();
    const supplier = {
      id: 1,
      supplier_name: 'supplier name',
      brand_names: ['brands 1', 'brand 2', 'brand 3'],
      link: 'http://supplier.co.uk',
      preferred_supplier: false,
    };
    const component = shallow(
      <SupplierEdit supplier={supplier} deleteSupplier={deleteSupplier} closeModal={closeModal} />,
    );

    component.find('EditModel').prop('modelDelete')(supplier.id);
    expect(deleteSupplier.mock.calls).toHaveLength(1);
    expect(closeModal.mock.calls).toHaveLength(1);
    expect(deleteSupplier.mock.calls[0][0]).toBe(supplier.id);
  });
  it('delete on modal for new supplier just closes modal', () => {
    const deleteSupplier = jest.fn();
    const closeModal = jest.fn();
    const supplier = {};
    const component = shallow(
      <SupplierEdit supplier={supplier} deleteSupplier={deleteSupplier} closeModal={closeModal} />,
    );

    component.find('EditModel').prop('modelDelete')(supplier.id);

    expect(deleteSupplier.mock.calls).toHaveLength(0);
    expect(closeModal.mock.calls).toHaveLength(1);
  });
});
