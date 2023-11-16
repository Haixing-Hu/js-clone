////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import cloneImpl from './clone-impl';
import mirror from './mirror';

/**
 * Clones a specified set.
 *
 * @param {Set} source
 *     The source set.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Set}
 *     The cloned set.
 * @author Haixing Hu
 */
function cloneSet(source, options, cache) {
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  // eslint-disable-next-line no-undef
  const result = new Set();
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  mirror(source, result, options, cache);
  // copy all items in the set
  for (const value of source) {
    const newValue = cloneImpl(value, options, cache);
    result.add(newValue);
  }
  return result;
}

export default cloneSet;
