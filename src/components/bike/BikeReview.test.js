import React from 'react';
import BikeReview from './BikeReview';
import { sampleBrands, sampleSections, sampleSuppliers } from '../../helpers/sampleData';
import { updateObject } from '../../helpers/utils';

const bikes = [
  {
    id: 1,
    frame: 1001,
    bikeParts: [
      { id: 101, partType: 1 },
      { id: 102, partType: 2 },
      { id: 103, partType: 3 },
    ],
  },
  { id: 2, frame: 1001, bikeParts: [{ id: 101, partType: 1 }] },
  { id: 3, frame: 3001 },
];
const frames = [{ id: 1001 }, { id: 3001 }];
describe('BikeReview', () => {
  let component;
  let reviewBike;
  let saveBike;
  let deleteBikes;
  const props = {
    sections: sampleSections,
    bikes,
    frames,
    brands: sampleBrands,
    suppliers: sampleSuppliers,
    bikeReviewList: [1, 2, 3],
    bikeId: 1,
  };
  beforeEach(() => {
    saveBike = jest.fn();
    deleteBikes = jest.fn();
    reviewBike = jest.fn();
    component = shallow(
      <BikeReview
        {...props}
        saveBike={saveBike}
        deleteBikes={deleteBikes}
        reviewBike={reviewBike}
      />,
    );
  });
  test('should render with basic info', () => {
    expect(component.find('h3')).toHaveLength(1);
    expect(component.find('button')).toHaveLength(3);
    expect(
      component
        .find('button')
        .at(0)
        .prop('disabled'),
    ).toBeFalsy();
    expect(
      component
        .find('button')
        .at(1)
        .prop('disabled'),
    ).toBeTruthy();
    expect(
      component
        .find('button')
        .at(2)
        .prop('disabled'),
    ).toBeTruthy();
    expect(component.find('EditModel')).toHaveLength(5);
    expect(component.find('Pagination')).toHaveLength(1);
  });
  test('should call review bike with next bike when page is selected', () => {
    component.find('Pagination').prop('getPage')(2);
    expect(reviewBike).toHaveBeenCalledTimes(1);
    expect(reviewBike).toHaveBeenCalledWith(2);
  });
  test('should remove a bike part when delete is used from row', () => {
    const editBike = component.find("[data-test='edit-bike']");
    expect(editBike.prop('persistedModel')).toEqual(bikes[0]);

    const updatedBike = updateObject(bikes[0], {
      bikeParts: [bikes[0].bikeParts[1], bikes[0].bikeParts[2]],
    });
    const editPart = component.find("[data-test='edit-bike-part']").at(0);
    const bikePartBeingEdited = editPart.prop('persistedModel');
    expect(bikePartBeingEdited).toEqual(bikes[0].bikeParts[0]);
    editPart.prop('modelDelete')(bikePartBeingEdited.id);

    const editBikePostDelete = component.find("[data-test='edit-bike']");
    expect(editBikePostDelete.prop('model')).toEqual(updatedBike);

    const editPartPostDelete = component.find("[data-test='edit-bike-part']").at(0);
    expect(editPartPostDelete.prop('persistedModel')).toEqual(bikes[0].bikeParts[1]);
    expect(
      component
        .find('button')
        .at(1)
        .prop('disabled'),
    ).toBeFalsy();
    expect(
      component
        .find('button')
        .at(2)
        .prop('disabled'),
    ).toBeFalsy();
  });
  test('should replace a bike part when a partType that exists is saved', () => {
    const editPart = component.find("[data-test='edit-bike-part']").at(0);
    const bikePartBeingEdited = editPart.prop('persistedModel');
    expect(bikePartBeingEdited).toEqual(bikes[0].bikeParts[0]);

    const updatedBikePart = updateObject(bikePartBeingEdited, { partName: 'newPartName' });
    editPart.prop('modelSave')(updatedBikePart);

    const editPartPostDelete = component.find("[data-test='edit-bike-part']").at(0);
    expect(editPartPostDelete.prop('persistedModel')).toEqual(bikes[0].bikeParts[0]);
    expect(editPartPostDelete.prop('model')).toEqual({
      id: 101,
      partType: 1,
      partName: 'newPartName',
    });
    expect(
      component
        .find('button')
        .at(1)
        .prop('disabled'),
    ).toBeFalsy();
    expect(
      component
        .find('button')
        .at(2)
        .prop('disabled'),
    ).toBeFalsy();
  });
  test('should call addBikePart when a part that is new is saved', () => {
    const editPart = component.find("[data-test='edit-bike-part']").at(3);
    const newPart = updateObject(editPart.prop('model'), { partType: 4, partName: 'my new part' });
    editPart.prop('modelSave')(newPart);

    const partsNow = component.find("[data-test='edit-bike-part']");
    expect(partsNow).toHaveLength(5);

    const editPart4Now = component.find("[data-test='edit-bike-part']").at(3);
    expect(editPart4Now.prop('model')).toEqual({ id: 4, partType: 4, partName: 'my new part' });
    expect(editPart4Now.prop('persistedModel')).not.toBeDefined();
    expect(
      component
        .find('button')
        .at(1)
        .prop('disabled'),
    ).toBeFalsy();
    expect(
      component
        .find('button')
        .at(2)
        .prop('disabled'),
    ).toBeFalsy();
  });
});
