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
 * Unit test the `clone()` function to clone built-in `Set`.
 *
 * @author Haixing Hu
 */
describe('clone built-in Set', () => {
  describe('Set', () => {
    test('empty', () => {
      const empty = new Set([]);
      expectAlike(clone(empty), empty);
    });
    test('nonempty', () => {
      const nonempty = new Set([1, 2, 3]);
      expectAlike(clone(nonempty), nonempty);
    });
    test('nested', () => {
      const child = new Set(['child']);
      const parent = new Set([child]);
      expectAlike(clone(parent), parent);
    });
    test('cyclic', () => {
      const cyclic = new Set();
      cyclic.add(cyclic);
      const cloned = clone(cyclic);
      expect(cloned).not.toBe(cyclic);
      expect(cloned.has(cloned)).toBe(true);
    });
    testMonkeyPatched(new Set([1, 2, 3]));
    testMonkeyPatchedSelfReference(new Set([1, 2, 3]));
  });
});
