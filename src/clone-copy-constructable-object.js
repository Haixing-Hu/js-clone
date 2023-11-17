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
 * Clones a copy-constructable built-in object.
 *
 * @param {Object} source
 *     The source object, which must be a copy-constructable built-in object.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Object}
 *     The cloned object, which have the same type as the source object, and
 *     preserves the same monkey-patched properties as the source object.
 */
function cloneCopyConstructableObject(source, options, cache) {
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  // use the copy constructor to clone the source object
  const result = new source.constructor(source);
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  mirror(source, result, options, cache);     // involve recursive call
  return result;
}

export default cloneCopyConstructableObject;
