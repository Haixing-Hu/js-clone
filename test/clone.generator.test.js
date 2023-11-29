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
 * Unit test the `clone()` function to clone generators.
 *
 * @author Haixing Hu
 */
describe('clone generators', () => {
  test('Generator', () => {
    function* foo() {
      yield 'a';
      yield 'b';
      yield 'c';
    }
    const x = foo();
    expect(clone(x)).toBe(x);
  });
  test('AsyncGenerator', () => {
    async function* foo() {
      yield await Promise.resolve('a');
      yield await Promise.resolve('b');
      yield await Promise.resolve('c');
    }
    const x = foo();
    expect(clone(x)).toBe(x);
  });
});
