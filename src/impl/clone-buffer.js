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
 * Clones a specified buffer.
 *
 * @param {ArrayBuffer|SharedArrayBuffer} source
 *     The source buffer.
 * @param {number} depth
 *     The current depth of the source object in the cloning process.
 *     The depth of the root object is 0.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @return {ArrayBuffer|SharedArrayBuffer}
 *     The cloned buffer.
 * @private
 * @author Haixing Hu
 */
function cloneBuffer(source, depth, options, cache) {
  // ArrayBuffer and SharedArrayBuffer provide the `slice()` function to clone a new buffer
  const result = source.slice();
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  copyProperties(source, result, depth, options, cache);
  return result;
}

export default cloneBuffer;
