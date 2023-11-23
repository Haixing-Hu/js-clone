////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';

/**
 * Unit test the `clone()` function to clone objects of a customized class with
 * defined properties.
 *
 * @author Haixing Hu
 */
describe('clone objects of class with defined properties', () => {
  class Gender {}
  Object.defineProperty(Gender.prototype, 'name', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '',
  });
  Object.defineProperty(Gender.prototype, 'value', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '',
  });
  Gender.MALE = new Gender();
  Gender.MALE.name = '男';
  Gender.MALE.value = 'MALE';
  Object.freeze(Gender.MALE);

  Gender.FEMALE = new Gender();
  Gender.FEMALE.name = '男';
  Gender.FEMALE.value = 'FEMALE';
  Object.freeze(Gender.FEMALE);

  test('clone()', () => {
    const male = Gender.MALE;
    const copy = clone(male, { includeReadonly: true, includeNonConfigurable: true });
    expect(copy).toEqual(male);
  });
});
