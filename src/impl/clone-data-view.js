////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import cloneBuffer from './clone-buffer';
import copyProperties from './copy-properties';

/**
 * Clones a specified `DataView`.
 *
 * @param {DataView} source
 *     The source `DataView` object.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {DataView}
 *     The cloned `DataView` object.
 * @author Haixing Hu
 */
function cloneDataView(source, options, cache) {
  const buffer = cloneBuffer(source.buffer, options, cache);
  // eslint-disable-next-line no-undef
  const result = new DataView(buffer, source.byteOffset, source.byteLength);
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  copyProperties(source, result, options, cache);
  return result;
}

export default cloneDataView;
