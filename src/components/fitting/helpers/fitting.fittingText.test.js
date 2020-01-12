import { fittingText } from './fitting';

describe('fitting.fittingText', () => {
  it('should display fields when they are set', () => {
    const fitting = {
      id: 12,
      fitting_type: 'C',
      saddle_height: '55cm',
      bar_height: '67cm',
      reach: '50cm',
    };
    const expectedText = '(Customer) Saddle height: 55cm Bar height: 67cm Reach: 50cm';
    expect(fittingText(fitting)).toEqual(expectedText);
  });
  it('should display unknown for fields when they are not set', () => {
    const fitting = {
      id: 12,
      fitting_type: 'x',
      saddle_height: '55cm',
      reach: '50cm',
    };
    const expectedText = '(x) Saddle height: 55cm Bar height: Unknown Reach: 50cm';
    expect(fittingText(fitting)).toEqual(expectedText);
  });
});
