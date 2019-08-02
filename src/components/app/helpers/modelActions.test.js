import { modelActions } from '../model/helpers/modelActions';

describe('modelActions', () => {
  const modelReset = jest.fn();
  const modelSave = jest.fn();
  const modelDelete = jest.fn();
  it('should show reset enabled when valid and changed and id', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'undo',
        iconTitle: 'undo changes',
        iconAction: () => modelReset(),
        iconDisabled: false,
      },
    ]);
    const model = { changed: true };
    expect(JSON.stringify(modelActions(model, { modelReset }))).toEqual(expectedActions);
  });
  it('should show reset disabled when not changed', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'undo',
        iconTitle: 'undo changes',
        iconAction: () => modelReset(),
        iconDisabled: true,
      },
    ]);
    const model = { changed: false };
    expect(JSON.stringify(modelActions(model, { modelReset }))).toEqual(expectedActions);
  });
  it('should show save enabled when valid and changed and id', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'check',
        iconTitle: 'save changes',
        iconAction: () => modelSave(),
        iconDisabled: false,
      },
    ]);
    const model = { changed: true };
    expect(JSON.stringify(modelActions(model, { modelSave }))).toEqual(expectedActions);
  });
  it('should show save disabled when there are no changes', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'check',
        iconTitle: 'save changes',
        iconAction: () => modelSave(),
        iconDisabled: true,
      },
    ]);
    const model = { changed: false };
    expect(JSON.stringify(modelActions(model, { modelSave }))).toEqual(expectedActions);
  });
  it('should show save disabled when there are changes and errors', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'check',
        iconTitle: 'save changes',
        iconAction: () => modelSave(),
        iconDisabled: true,
      },
    ]);
    const model = { changed: true, error_detail: { thing: 'an error' } };
    expect(JSON.stringify(modelActions(model, { modelSave }))).toEqual(expectedActions);
  });
  it('should show delete enabled when valid and not deleted and id', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'delete',
        iconTitle: 'delete',
        iconAction: () => modelDelete(),
        iconDisabled: false,
      },
    ]);
    const model = { id: 23 };
    expect(JSON.stringify(modelActions(model, { modelDelete }))).toEqual(expectedActions);
  });
  it('should show delete disabled when already deleted and id', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'delete',
        iconTitle: 'delete',
        iconAction: () => modelDelete(),
        iconDisabled: true,
      },
    ]);
    const model = { id: 23, deleted: true };
    expect(JSON.stringify(modelActions(model, { modelDelete }))).toEqual(expectedActions);
  });
  it('should show delete disabled when no id', () => {
    const expectedActions = JSON.stringify([
      {
        iconName: 'delete',
        iconTitle: 'delete',
        iconAction: () => modelDelete(),
        iconDisabled: true,
      },
    ]);
    const model = { thing: 'thong' };
    expect(JSON.stringify(modelActions(model, { modelDelete }))).toEqual(expectedActions);
  });
  it('should show all actions when multiple passed', () => {
    const model = { thing: 'thong' };
    expect(modelActions(model, { modelSave, modelReset, modelDelete })).toHaveLength(3);
  });
  it('should show additional actions when multiple functions passed and additional actions', () => {
    const additionalActions = [
      {
        iconName: 'show',
        iconTitle: 'show detail',
        iconAction: () => jest.fn(),
        iconDisabled: false,
      },
      {
        iconName: 'archive',
        iconTitle: 'archive detail',
        iconAction: () => jest.fn(),
        iconDisabled: false,
      },
    ];
    const expectedActions = JSON.stringify([
      {
        iconName: 'delete',
        iconTitle: 'delete',
        iconAction: () => modelDelete(),
        iconDisabled: true,
      },
      {
        iconName: 'show',
        iconTitle: 'show detail',
        iconAction: () => jest.fn(),
        iconDisabled: false,
      },
      {
        iconName: 'archive',
        iconTitle: 'archive detail',
        iconAction: () => jest.fn(),
        iconDisabled: false,
      },
    ]);
    const model = { thing: 'thong' };
    expect(JSON.stringify(modelActions(model, { modelDelete }, additionalActions))).toEqual(
      expectedActions,
    );
  });
});
