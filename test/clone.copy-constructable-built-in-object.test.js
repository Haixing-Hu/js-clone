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

/* eslint-disable prefer-regex-literals */

/**
 * Unit test the `clone()` function to clone built-in copy constructable objects.
 *
 * @author Haixing Hu
 */
describe('clone built-in copy constructable objects', () => {
  describe('Date', () => {
    test('simple case', () => {
      const obj = new Date();
      expectAlike(clone(obj), obj);
    });
    testMonkeyPatched(new Date());
    testMonkeyPatchedSelfReference(new Date());
  });
  describe('RegExp', () => {
    test('simple case', () => {
      const obj1 = /x/g;
      expectAlike(clone(obj1), obj1);
      const obj2 = new RegExp(/x/g);
      expectAlike(clone(obj2), obj2);
    });
    testMonkeyPatched(/x/g);
    testMonkeyPatched(new RegExp(/x/g));
    testMonkeyPatchedSelfReference(/x/g);
    testMonkeyPatchedSelfReference(new RegExp(/x/g));
  });
});
