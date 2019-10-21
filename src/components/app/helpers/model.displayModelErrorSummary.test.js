/* eslint-disable max-len */
import { customerAddressFields } from '../model/helpers/fields';
import { displayModelErrorSummary } from '../model/helpers/model';
describe('displayModelErrorSummary', () => {
  it('if no error or error_detail undefined returned', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
    };
    const result = displayModelErrorSummary(model, customerAddressFields);
    expect(result).toBe(undefined);
  });
  it('if just error no error_detail error returned', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      error: 'Model level error',
    };
    const result = displayModelErrorSummary(model, customerAddressFields);
    expect(result).toBe('Model level error');
  });
  it('if no error with error_detail error_details formatted returned', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      error_detail: {
        address1: ['A valid address is required.', 'SHow me the address is required.'],
        postcode: ['This field may not be blank.'],
      },
    };
    const expectedText =
      'Address: A valid address is required. SHow me the address is required.<br>Postcode: This field may not be blank.';
    const result = displayModelErrorSummary(model, customerAddressFields);
    expect(result).toBe(expectedText);
  });
  it('if error and error_detail formatted returned', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      error: 'Model level error',
      error_detail: {
        address1: ['A valid address is required.', 'SHow me the address is required.'],
        postcode: ['This field may not be blank.'],
      },
    };
    const expectedText =
      'Model level error<br>Address: A valid address is required. SHow me the address is required.<br>Postcode: This field may not be blank.';
    const result = displayModelErrorSummary(model, customerAddressFields);
    expect(result).toBe(expectedText);
  });
});
