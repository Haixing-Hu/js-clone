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
import testMonkeyPatchedSelfReference
  from './utils/test-monkey-patched-self-reference';

/**
 * Unit test the `clone()` function to clone typed arrays.
 *
 * @author Haixing Hu
 */
describe('clone typed arrays et al', () => {
  describe('ArrayBuffer', () => {
    test('simple', () => {
      const buffer = new ArrayBuffer(32);
      expectAlike(clone(buffer), buffer);
    });
    testMonkeyPatched(new ArrayBuffer(16));
    testMonkeyPatchedSelfReference(new ArrayBuffer(16));
  });
  describe('SharedArrayBuffer', () => {
    // TODO: Doesn't really seem to be any way to it these?
  });
});
