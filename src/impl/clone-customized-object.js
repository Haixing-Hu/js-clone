////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
/* eslint-disable import/no-cycle */
import copyProperties from './copy-properties';

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
 */
function cloneCustomizedObject(source, options, cache) {
  const prototype = Object.getPrototypeOf(source);
  const result = Object.create(prototype);
  cache.set(source, result);
  copyProperties(source, result, options, cache);
  return result;
}

export default cloneCustomizedObject;
