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

function testError(error) {
  describe(error.constructor.prototype.name, () => {
    test('simple case', () => {
      expectAlike(clone(error), error);
    });
    const e1 = clone(error);
    testMonkeyPatched(e1);
    const e2 = clone(error);
    testMonkeyPatchedSelfReference(e2);
  });
}

export default testError;
