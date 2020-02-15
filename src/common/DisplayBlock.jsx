import React from 'react';

import * as PropTypes from 'prop-types';
import { doWeHaveObjects, generateRandomCode } from '../helpers/utils';

const DisplayBlock = props => {
  const { arrayOfThings } = props;
  if (!doWeHaveObjects(arrayOfThings)) return null;

  if (arrayOfThings.length === 1) {
    return <div data-test="block-element">{arrayOfThings[0]}</div>;
  }

  return (
    <div className="flex-vertical" data-test="block-container">
      {arrayOfThings.map(thing => (
        <div data-test="block-element" key={generateRandomCode()}>
          {thing}
        </div>
      ))}
    </div>
  );
};

DisplayBlock.propTypes = {
  arrayOfThings: PropTypes.array,
};
export default DisplayBlock;
