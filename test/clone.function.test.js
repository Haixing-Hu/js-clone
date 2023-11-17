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
 * Unit test the `clone()` function to clone functions.
 *
 * @author Haixing Hu
 */
describe('clone functions', () => {
  test('clone a function', () => {
    function foo() {
      return 1;
    }
    const fooClone = clone(foo);
    expect(fooClone).toBe(foo);
  });
  test('clone a generator function', () => {
    function* foo() {
      yield 'a';
      yield 'b';
      yield 'c';
    }
    const fooClone = clone(foo);
    expect(fooClone).toBe(foo);
  });
  test('clone a async function', () => {
    async function foo() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo');
        }, 300);
      });
    }
    const fooClone = clone(foo);
    expect(fooClone).toBe(foo);
  });
  test('clone a async generator function', () => {
    async function* foo() {
      yield await Promise.resolve('a');
      yield await Promise.resolve('b');
      yield await Promise.resolve('c');
    }
    const fooClone = clone(foo);
    expect(fooClone).toBe(foo);
  });
});
