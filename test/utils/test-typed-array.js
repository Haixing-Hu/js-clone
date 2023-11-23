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
import testMonkeyPatched from './test-monkey-patched';
import testMonkeyPatchedSelfReference from './test-monkey-patched-self-reference';

function testTypedArray(constructor, sampleValue) {
  describe(constructor.name, () => {
    test('empty', () => {
      const empty = new constructor(32);
      expectAlike(clone(empty), empty);
    });
    test('nonempty', () => {
      const nonempty = new constructor(32);
      nonempty[0] = sampleValue;
      nonempty[15] = sampleValue;
      nonempty[31] = sampleValue;
      expectAlike(clone(nonempty), nonempty);
    });
    const array1 = new constructor(32);
    array1[0] = sampleValue;
    array1[15] = sampleValue;
    array1[31] = sampleValue;
    testMonkeyPatched(array1);
    const array2 = new constructor(32);
    array2[0] = sampleValue;
    array2[15] = sampleValue;
    array2[31] = sampleValue;
    testMonkeyPatchedSelfReference(array2);
  });
}

export default testTypedArray;
