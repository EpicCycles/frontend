import {
  ADDRESS1_FIELD,
  ADDRESS2_FIELD,
  POSTCODE_FIELD,
} from '../../../../components/app/model/helpers/fields';
import { ADDRESS_MISSING } from '../../../../components/app/model/helpers/error';
import { applyFieldValueToModel } from '../../../../components/app/model/helpers/model';

describe('applyFieldValueToMOdel', () => {
  it('missing field not required or validated added to model', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
    };
    const updatedModel = {
      id: 123,
      address1: 'line one',
      address2: '',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      changed: true,
      error_detail: {},
    };
    const result = applyFieldValueToModel(model, ADDRESS2_FIELD);
    expect(result).toEqual(updatedModel);
  });
  it('field not required or validated added to model', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      error_detail: { address2: 'random error to be removed' },
    };
    const updatedModel = {
      id: 123,
      address1: 'line one',
      address2: 'line two corrected',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      changed: true,
      error_detail: {},
    };
    const result = applyFieldValueToModel(model, ADDRESS2_FIELD, 'line two corrected');
    expect(result).toEqual(updatedModel);
  });
  it('empty field not required or validated added to model', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
    };
    const updatedModel = {
      id: 123,
      address1: 'line one',
      address2: '',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      changed: true,
      error_detail: {},
    };
    const result = applyFieldValueToModel(model, ADDRESS2_FIELD, '');
    expect(result).toEqual(updatedModel);
  });
  it('missing field required or validated added to model with error', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
    };
    const updatedModel = {
      id: 123,
      address1: '',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      changed: true,
      error_detail: { address1: ADDRESS_MISSING },
    };
    const result = applyFieldValueToModel(model, ADDRESS1_FIELD);
    expect(result).toEqual(updatedModel);
  });
  it('empty field required or validated added to model with error', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
    };
    const updatedModel = {
      id: 123,
      address1: '',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      customer: 6,
      changed: true,
      error_detail: { address1: ADDRESS_MISSING },
    };
    const result = applyFieldValueToModel(model, ADDRESS1_FIELD, '');
    expect(result).toEqual(updatedModel);
  });
  it('field needing validation fails and added to model', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      country: 'GB',
      customer: 6,
    };
    const updatedModel = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'oops',
      customer: 6,
      country: 'GB',
      changed: true,
      error_detail: {
        postcode: 'A postcode is expected which for this country has the format CCNN NCC',
      },
    };
    const result = applyFieldValueToModel(model, POSTCODE_FIELD, 'oops');
    expect(result).toEqual(updatedModel);
  });
  it('field needing validation passes and added to model', () => {
    const model = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'xxxyyy',
      country: 'GB',
      customer: 6,
      error_detail: {
        postcode: 'A postcode is expected which for this country has the format CCNN NCC',
      },
    };
    const updatedModel = {
      id: 123,
      address1: 'line one',
      address2: 'line Ywo',
      address3: 'line Three',
      address4: 'line Four',
      postcode: 'SY8 1EE',
      customer: 6,
      changed: true,
      country: 'GB',
      error_detail: {},
    };
    const result = applyFieldValueToModel(model, POSTCODE_FIELD, 'SY8 1EE');
    expect(result).toEqual(updatedModel);
  });
});
