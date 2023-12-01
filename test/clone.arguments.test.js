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
 * Unit test the `clone()` function to clone the built-in arguments object.
 *
 * @author Haixing Hu
 */
describe('clone built-in arguments object', () => {
  test('simple case', () => {
    function foo() {
      /* eslint-disable-next-line prefer-rest-params */
      expect(clone(arguments)).toBe(arguments);
    }
    foo(1, 2, 3);
  });
});
