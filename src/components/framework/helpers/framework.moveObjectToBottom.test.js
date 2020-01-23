import React from 'react';
import { moveObjectToBottom } from './framework';

describe('moveObjectToBottom tests', () => {
  it('does not fail if an id is not found', () => {
    const sections = [
      { id: 97, placing: 2 },
      { id: 7, placing: 3 },
    ];
    const newSections = moveObjectToBottom(sections, 33);
    expect(newSections).toEqual(sections);
  });
  it('does not fail if this is only item in array', () => {
    const sections = [{ id: 33, placing: 2 }];
    const newSections = moveObjectToBottom(sections, 33);
    expect(newSections).toEqual(sections);
  });
  it('does not fail if last item in array', () => {
    const sections = [
      { id: 7, placing: 3 },
      { id: 33, placing: 2 },
    ];
    const newSections = moveObjectToBottom(sections, 33);
    expect(newSections).toEqual(sections);
  });
  it('can move item into last place', () => {
    const sections = [
      { id: 97, placing: 2 },
      { id: 7, placing: 3 },
      { id: 33, placing: 2 },
      { id: 37, placing: 3 },
    ];
    const newSections = moveObjectToBottom(sections, 33);
    expect(newSections).toHaveLength(sections.length);
    expect(newSections[0].id).toBe(97);
    expect(newSections[0].placing).toBe(10);
    expect(newSections[1].id).toBe(7);
    expect(newSections[1].placing).toBe(20);
    expect(newSections[2].id).toBe(37);
    expect(newSections[2].placing).toBe(30);
    expect(newSections[3].id).toBe(33);
    expect(newSections[3].placing).toBe(40);
  });
  it('can move an item from 1st place', () => {
    const sections = [
      { id: 33, placing: 2 },
      { id: 97, placing: 2 },
      { id: 7, placing: 3 },
      { id: 37, placing: 3 },
    ];
    const newSections = moveObjectToBottom(sections, 33);
    expect(newSections).toHaveLength(sections.length);
    expect(newSections[0].id).toBe(97);
    expect(newSections[0].placing).toBe(10);
    expect(newSections[1].id).toBe(7);
    expect(newSections[1].placing).toBe(20);
    expect(newSections[2].id).toBe(37);
    expect(newSections[2].placing).toBe(30);
    expect(newSections[3].id).toBe(33);
    expect(newSections[3].placing).toBe(40);
  });
  it('can move an item in the middle', () => {
    const sections = [
      { id: 97, placing: 2 },
      { id: 33, placing: 2 },
      { id: 7, placing: 3 },
      { id: 37, placing: 3 },
    ];
    const newSections = moveObjectToBottom(sections, 33);
    expect(newSections).toHaveLength(sections.length);
    expect(newSections[0].id).toBe(97);
    expect(newSections[0].placing).toBe(10);
    expect(newSections[1].id).toBe(7);
    expect(newSections[1].placing).toBe(20);
    expect(newSections[2].id).toBe(37);
    expect(newSections[2].placing).toBe(30);
    expect(newSections[3].id).toBe(33);
    expect(newSections[3].placing).toBe(40);
  });
});
