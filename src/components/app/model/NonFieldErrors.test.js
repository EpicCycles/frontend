/* eslint-disable camelcase */
import NonFieldErrors from './NonFieldErrors';
import { findDataTest } from '../../../helpers/jest_helpers/assert';

describe('NonFieldErrors', () => {
  it('should return null when no non field errors exist', () => {
    const error_detail = {};
    const component = shallow(<NonFieldErrors componentKey="xxx" error_detail={error_detail} />);
    expect(component.type()).toEqual(null);
  });
  it('should return a non field error when one is passed', () => {
    const error_detail = {
      non_field_errors: ['This address is already in use for the same customer'],
    };
    const component = shallow(<NonFieldErrors componentKey="xxx" error_detail={error_detail} />);
    expect(component.type()).not.toEqual(null);
    expect(findDataTest(component, 'error-detail-div')).toHaveLength(1);
  });
  it('should return a non field error when multiple are passed', () => {
    const error_detail = {
      non_field_errors: [
        'This address is already in use for the same customer',
        'This address is a pig',
      ],
    };
    const component = shallow(<NonFieldErrors componentKey="xxx" error_detail={error_detail} />);
    expect(component.type()).not.toEqual(null);
    expect(findDataTest(component, 'error-detail-div')).toHaveLength(1);
  });
});
