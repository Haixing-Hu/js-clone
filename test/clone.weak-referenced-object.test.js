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
 * Unit test the `clone()` function to clone weak referenced objects.
 *
 * @author Haixing Hu
 */
describe('clone weak referenced objects', () => {
  test('WeakMap cannot be cloned, just return the source', () => {
    const map = new WeakMap();
    const k1 = {};
    const k2 = function () {};    //  eslint-disable-line func-names
    const k3 = window;
    map.set(k1, 1);
    map.set(k2, 2);
    map.set(k3, 3);
    expect(clone(map)).toBe(map);
  });
  test('WeakSet cannot be cloned, just return the source', () => {
    const set = new WeakSet();
    const k1 = {};
    const k2 = function () {};  //  eslint-disable-line func-names
    const k3 = window;
    set.add(k1);
    set.add(k2);
    set.add(k3);
    expect(clone(set)).toBe(set);
  });
  test('WeakRef cannot be cloned, just return the source', () => {
    const ref = new WeakRef(window);
    expect(clone(ref)).toBe(ref);
  });
});
