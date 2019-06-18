import React from 'react';
import * as PropTypes from 'prop-types';
import { buildFrameWorkPartDisplay, partTypePartAndBrandString } from './helpers/part';

const PartDisplaySummary = props => {
  const { parts, brands, sections } = props;
  const displaySections = buildFrameWorkPartDisplay(sections, parts, false);
  return (
    <div>
      {displaySections.map(section => {
        return section.parts.map(part => {
          return (
            <div key={`partSummary${part.id}`}>
              {partTypePartAndBrandString(part, sections, brands)}
            </div>
          );
        });
      })}
    </div>
  );
};

PartDisplaySummary.propTypes = {
  parts: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
};

export default PartDisplaySummary;
