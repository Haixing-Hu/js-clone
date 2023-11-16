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
  // set the cause if necessary
  if (source.cause) {
    result.cause = cloneError(source.cause, options, cache);  // recursive call
  }
  // copy other monkey patched properties
  mirror(source, result, options, cache);     // involve recursive call
  return result;
}

export default cloneError;
