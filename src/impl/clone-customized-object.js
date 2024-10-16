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
 * Create a new user-defined object.
 *
 * @param {object} source
 *     the source object.
 * @param {object} options
 *     options of the cloning algorithm.
 * @return {object}
 *     the target object.
 * @private
 * @author Haixing Hu
 */
function createCustomizedObject(source, options) {
  if (options.pojo) {
    return {};
  } else {
    return Object.create(Object.getPrototypeOf(source));
  }
}

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
 * @private
 * @author Haixing Hu
 */
function cloneCustomizedObject(source, options, cache) {
  const result = createCustomizedObject(source, options);
  cache.set(source, result);
  copyProperties(source, result, options, cache);
  return result;
}

export default cloneCustomizedObject;
