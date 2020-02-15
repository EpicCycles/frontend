import { getBrandName } from '../../brand/helpers/brand';
import { findObjectWithId, updateObject } from '../../../helpers/utils';

export const buildDataForApi = (brand, frameName, rowMappings, uploadedHeaders, uploadedData) => {
  const frame = {
    brand: brand,
    frame_name: frameName,
  };
  // start by building an array of bike objects.
  const bikeNames = uploadedHeaders.slice(1);
  let bikes = bikeNames.map(bikeName => {
    return { model_name: bikeName, bikeParts: [] };
  });
  const numberOfBikes = bikes.length;

  rowMappings.forEach(rowMapping => {
    if (!rowMapping.ignore) {
      const dataToUse = uploadedData[rowMapping.rowIndex].slice(1);
      dataToUse.forEach((dataValue, bikeIndex) => {
        if (bikeIndex < numberOfBikes && dataValue.trim().length > 0) {
          if (rowMapping.bikeAttribute) {
            bikes[bikeIndex][rowMapping.bikeAttribute] = dataValue;
          } else if (rowMapping.partType) {
            bikes[bikeIndex].bikeParts.push({
              id: rowMapping.partType,
              partType: rowMapping.partType,
              partName: dataValue,
            });
          }
        }
      });
    }
  });
  frame.bikes = bikes.map(bike =>
    updateObject(bike, { bikeParts: JSON.stringify(bike.bikeParts) }),
  );
  return frame;
};

export const bikeFullName = (bike, frames, brands) => {
  if (bike.frame_name) return `${bike.frame_name} ${bike.model_name}`;
  const frame = findObjectWithId(frames, bike.frame);
  if (!frame) return `${bike.model_name} (unknown brand and frame)`;
  return `${getBrandName(frame.brand, brands)}: ${frame.frame_name} ${bike.model_name}`;
};

export const getBikeName = (bikeId, bikes, frames, brands) => {
  const bike = findObjectWithId(bikes, bikeId);
  if (bike) return bikeFullName(bike, frames, brands);
  return 'Unknown Bike';
};
