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

function testMonkeyPatchedSelfReference(obj, options = {}) {
  obj.selfReference = obj;
  test('Monkey patched self-referenced attributes should be preserved', () => {
    const cloned = clone(obj, options);
    expect(cloned.selfReference).toBe(cloned);
  });
  test('Monkey patched self-referenced attributes should not break correctness', () => {
    const cloned = clone(obj, options);
    expectAlike(cloned, obj);
  });
}

export default testMonkeyPatchedSelfReference;
