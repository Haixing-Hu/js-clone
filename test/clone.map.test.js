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
 * Unit test the `clone()` function to clone built-in `Map`.
 *
 * @author Haixing Hu
 */
describe('clone built-in Map', () => {
  describe('Map', () => {
    test('empty', () => {
      const empty = new Map();
      expectAlike(clone(empty), empty);
    });
    test('nonempty', () => {
      const nonempty = new Map([['ping', 'x'], ['y', 'pong']]);
      const cloned = clone(nonempty);
      expectAlike(cloned, nonempty);
    });
    test('nested', () => {
      const nested = new Map([['m', new Map([['mx', 0]])]]);
      const cloned = clone(nested);
      expectAlike(cloned, nested);
      expectAlike(cloned.get('m'), nested.get('m'));
    });
    test('cyclic', () => {
      const cyclic = new Map();
      cyclic.set('self', cyclic);
      const cloned = clone(cyclic);
      expect(cloned).not.toBe(cyclic);
      expect(cloned.size).toBe(cyclic.size);
      expect(cloned.get('self')).toBe(cloned);
    });
    test('diamond', () => {
      const child = new Map([['i am', 'child']]);
      const diamond = new Map([['a', child], ['b', child]]);
      const cloned = clone(diamond);
      expectAlike(cloned, diamond);
    });
    testMonkeyPatched(new Map([['ping', 'x'], ['y', 'pong']]));
    testMonkeyPatchedSelfReference(new Map([['ping', 'x'], ['y', 'pong']]));
  });
});
