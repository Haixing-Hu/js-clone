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
 * Unit test the `clone()` function to clone typed arrays.
 *
 * @author Haixing Hu
 */
describe('clone typed arrays et al', () => {
  describe('DataView', () => {
    test('simple', () => {
      const buffer = new ArrayBuffer(32);
      const view = new DataView(buffer, 1, 16);
      const cloned = clone(view);
      expectAlike(cloned, view);
      expect(cloned.buffer).not.toBe(view.buffer);
      cloned.setInt16(0, 12);
      expect(view.getInt16(0)).not.toBe(12);
      expect(view.getInt16(1)).not.toBe(12);
    });
    testMonkeyPatched(new DataView(new ArrayBuffer(16)));
    testMonkeyPatchedSelfReference(new DataView(new ArrayBuffer(16)));
  });
});
