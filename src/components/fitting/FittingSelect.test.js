import FittingSelect from './FittingSelect';
import { fittingText } from './helpers/fitting';

describe('FittingSelect', () => {
  it('should show an empty list when no fitting data is provided', () => {
    const component = shallow(<FittingSelect selectFitting={jest.fn()} fieldName={'fitting'} />);
    const select = component.find('SelectInput');

    expect(select.prop('value')).toEqual('');
    expect(select.prop('options')).toEqual([]);
    expect(select.prop('fieldName')).toEqual('fitting');
  });
  it('should show a list when fitting data is provided', () => {
    const fittings = [
      { id: 12, type: 'C', saddle: '55cm', bar: '67cm, ', reach: '50cm' },
      { id: 14, type: 'C', saddle: '55cm', bar: '67cm, ', reach: '50cm' },
    ];
    const fittingOptions = [
      { value: '12', name: fittingText(fittings[0]) },
      { value: '14', name: fittingText(fittings[0]) },
    ];
    const component = shallow(
      <FittingSelect
        fittings={fittings}
        selectedFitting={12}
        selectFitting={jest.fn()}
        fieldName={'fitting'}
      />,
    );
    const select = component.find('SelectInput');

    expect(select.prop('value')).toEqual('12');
    expect(select.prop('options')).toEqual(fittingOptions);
    expect(select.prop('fieldName')).toEqual('fitting');
  });
});
