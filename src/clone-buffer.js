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
 * Clones a specified buffer.
 *
 * @param {ArrayBuffer|SharedArrayBuffer} source
 *     The source buffer.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @return {ArrayBuffer|SharedArrayBuffer}
 *     The cloned buffer.
 * @author Haixing Hu
 */
function cloneBuffer(source, options, cache) {
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  // ArrayBuffer and SharedArrayBuffer provide the `slice()` function to clone a new buffer
  const result = source.slice();
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  mirror(source, result, options, cache);
  return result;
}

export default cloneBuffer;
