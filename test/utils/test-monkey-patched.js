////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../../src';
import expectAlike from './expect-alike';

function testMonkeyPatched(obj, options = {}) {
  const prop = Symbol('monkey-patched');
  obj[prop] = 'prop value 1';
  obj.prop2 = 'prop value 2';
  test('Monkey patched attributes should be preserved', () => {
    const cloned = clone(obj, options);
    expect(cloned[prop]).toBe(obj[prop]);
    cloned[prop] = 'different';
    expect(cloned[prop]).not.toBe(obj[prop]);
    expect(cloned.prop2).toBe(obj.prop2);
    cloned.prop2 = 'different';
    expect(cloned.prop2).not.toBe(obj.prop2);
  });
  test('Monkey patched attributes should not break correctness', () => {
    const cloned = clone(obj, options);
    expectAlike(cloned, obj);
  });
}

export default testMonkeyPatched;
