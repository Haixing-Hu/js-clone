////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Expects a value is equals to another value but not the same.
 *
 * @param {any} var1
 *     The first value.
 * @param {any} var2
 *     The second value.
 * @throws {Error}
 *     If the two values are not equals or the same.
 * @author Haixing Hu
 */
function expectAlike(var1, var2) {
  expect(var1).not.toBe(var2);
  expect(var1).toEqual(var2);
}

export default expectAlike;
