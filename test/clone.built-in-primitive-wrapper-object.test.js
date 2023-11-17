////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';
import expectAlike from './utils/expect-alike';
import testMonkeyPatched from './utils/test-monkey-patched';
import testMonkeyPatchedSelfReference from './utils/test-monkey-patched-self-reference';

/**
 * Unit test the `clone()` function to clone built-in primitive wrapper objects.
 *
 * @author Haixing Hu
 */
describe('clone built-in primitive wrapper objects', () => {
  describe('Boolean', () => {
    test('simple case', () => {
      const obj1 = new Boolean(true);
      expectAlike(clone(obj1), obj1);
      const obj2 = new Boolean(false);
      expectAlike(clone(obj2), obj2);
    });
    testMonkeyPatched(new Boolean(true));
    testMonkeyPatched(new Boolean(false));
    testMonkeyPatchedSelfReference(new Boolean(true));
    testMonkeyPatchedSelfReference(new Boolean(false));
  });
  describe('Number', () => {
    test('simple case', () => {
      const obj1 = new Number(3.14);
      expectAlike(clone(obj1), obj1);
      const obj2 = new Number(NaN);
      expectAlike(clone(obj2), obj2);
    });
    testMonkeyPatched(new Number(3.14));
    testMonkeyPatched(new Number(NaN));
    testMonkeyPatchedSelfReference(new Number(3.14));
    testMonkeyPatchedSelfReference(new Number(NaN));
  });
  describe('String', () => {
    test('simple case', () => {
      const obj1 = new String('');
      expectAlike(clone(obj1), obj1);
      const obj2 = new String('hello world');
      expectAlike(clone(obj2), obj2);
    });
    testMonkeyPatched(new String(''));
    testMonkeyPatched(new String('hello world'));
    testMonkeyPatchedSelfReference(new String(''));
    testMonkeyPatchedSelfReference(new String('hello world'));
  });
});
