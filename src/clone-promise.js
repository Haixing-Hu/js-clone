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
 * Clones a specified promise.
 *
 * @param {Promise} source
 *     The source promise.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Promise}
 *     The cloned promise.
 * @author Haixing Hu
 */
function clonePromise(source, options, cache) {
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  // eslint-disable-next-line no-undef
  const result = new Promise(source.then.bind(source));
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  mirror(source, result, options, cache);
  return result;
}

export default clonePromise;
