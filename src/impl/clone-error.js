////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import mirrorProperties from './mirror-properties';

/**
 * Clones a specified `Error` object.
 *
 * @param {Error} source
 *     The source `Error` object, which can be an instance of any subclass of
 *     `Error`.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Error}
 *     The cloned `Error` object, which have the same type as the source object.
 * @author Haixing Hu
 */
function cloneError(source, options, cache) {
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  const result = new source.constructor(source.message);
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy the non-standard property `fileName` of the source if necessary
  if (source.fileName) {
    result.fileName = source.fileName;
  }
  // copy the non-standard property `lineNumber` of the source if necessary
  if (source.lineNumber) {
    result.lineNumber = source.lineNumber;
  }
  // copy the non-standard property `columnNumber` of the source if necessary
  if (source.columnNumber) {
    result.columnNumber = source.columnNumber;
  }
  // copy the non-standard property `stack` of the source if necessary
  if (source.stack) {
    result.stack = source.stack;
  }
  // deep clone the `cause` of the source if necessary
  if (source.cause) {
    result.cause = cloneError(source.cause, options, cache);  // recursive call
  }
  // copy other monkey patched properties
  mirrorProperties(source, result, options, cache);     // involve recursive call
  return result;
}

export default cloneError;
