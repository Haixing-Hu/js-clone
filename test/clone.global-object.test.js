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
 * Unit test the `clone()` function to clone the built-in global object.
 *
 * @author Haixing Hu
 */
describe('clone built-in global object', () => {
  test('simple case', () => {
    const global = Function('return this')(); // eslint-disable-line no-new-func
    expect(clone(global)).toBe(global);
  });
});
