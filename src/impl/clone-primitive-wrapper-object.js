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
 * Clones a built-in primitive-wrapper object.
 *
 * @param {Object} source
 *     The source object, which must be a built-in primitive-wrapper object, i.e.,
 *     an instance of `Boolean`, `Number`, or `String`.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Object}
 *     The cloned object, which have the same type as the source object, and
 *     preserves the same monkey-patched properties as the source object.
 * @private
 * @author Haixing Hu
 */
function clonePrimitiveWrapperObject(source, options, cache) {
  // Note that a `Boolean` object cannot be used to copy construct a cloned copy.
  // For example:
  //    x = new Boolean(false);
  //    y = new Boolean(x);
  // now the value of y is `true` instead of `false`, since the argument of the
  // constructor `Boolean` is converted to a boolean value before constructing
  // the new object.
  const result = new source.constructor(source.valueOf());
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  copyProperties(source, result, options, cache);     // involve recursive call
  return result;
}

export default clonePrimitiveWrapperObject;
