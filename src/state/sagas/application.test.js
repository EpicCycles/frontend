import { changeApplicationRoute } from './application';
import { call } from 'redux-saga/effects';
import history from '../../history';

describe('application saga', () => {
  test('changeApplicationRoute should update history', async () => {
    const generator = changeApplicationRoute({ payload: { newRoute: 'myNewRoute' } });
    expect(generator.next().value).toEqual(call(history.push, 'myNewRoute' ));
  });
});
