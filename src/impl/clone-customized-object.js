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
 * @param {object} source
 *     The source object.
 * @param {object} options
 *     Options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {object}
 *     The target object.
 * @private
 * @author Haixing Hu
 */
function cloneCustomizedObject(source, options, cache) {
  const target = createCustomizedObject(source, options);
  cache.set(source, target);
  copyProperties(source, target, options, cache);
  return target;
}

export default cloneCustomizedObject;
