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
 * Unit test the `clone()` function to clone built-in array.
 *
 * @author Haixing Hu
 */
describe('clone built-in array', () => {
  describe('Array', () => {
    test('empty', () => {
      const empty = [];
      expectAlike(clone(empty), empty);
    });
    test('nonempty', () => {
      const nonempty = [Number.INFINITY, 0, undefined, Symbol('sym'), 12];
      expectAlike(clone(nonempty), nonempty);
    });
    test('nested', () => {
      const nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const cloned = clone(nested);
      expectAlike(cloned, nested);
      for (let i = 0; i < nested.length; ++i) {
        expectAlike(cloned[i], nested[i]);
      }
    });
    test('cyclic', () => {
      const cyclic = ['before', undefined, 'after'];
      cyclic[1] = cyclic;
      const cloned = clone(cyclic);
      expect(cloned[0]).toBe('before');
      expect(cloned[1]).toBe(cloned);
      expect(cloned[2]).toBe('after');
    });
    test('diamond', () => {
      const child = ['im', 'child'];
      const parent = ['before', child, 'between', child, 'after'];
      const cloned = clone(parent);
      expectAlike(cloned, parent);
      expect(cloned[1]).not.toBe(parent[1]);
      expect(cloned[3]).toBe(cloned[3]);
    });
    test('sparse', () => {
      const sparse = [1, , 3, , 5];  // eslint-disable-line no-sparse-arrays
      expectAlike(clone(sparse), sparse);
    });
    testMonkeyPatched([3, 1, 4]);
    testMonkeyPatchedSelfReference([3, 1, 4]);
  });
});
