////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import mirror from './mirror';

/**
 * Clone a user-defined object.
 *
 * @param {Object} source
 *     The source object.
 * @param {Object} options
 *     Options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Object}
 *     The target object.
 * @author Haixing Hu
 * @private
 */
function cloneObject(source, options, cache) {
  const prototype = Object.getPrototypeOf(source);
  const result = Object.create(prototype);
  cache.set(source, result);
  mirror(source, result, options, cache);
  return result;
}

export default cloneObject;
