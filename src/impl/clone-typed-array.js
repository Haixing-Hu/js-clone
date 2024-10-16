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
 * Clones a typed array.
 *
 * @param {TypedArray} source
 *     The source typed array to be cloned, which may be one of the
 *     following typed arrays:
 *     - `Int8Array`: 8-bit two's complement signed integer array.
 *     - `Uint8Array`: 8-bit unsigned integer array.
 *     - `Uint8ClampedArray`: 8-bit unsigned integer array clamped to 0-255.
 *     - `Int16Array`: 16-bit two's complement signed integer array.
 *     - `Uint16Array`: 16-bit unsigned integer array.
 *     - `Int32Array`: 32-bit two's complement signed integer array.
 *     - `Uint32Array`: 32-bit unsigned integer array.
 *     - `BigInt64Array`: 64-bit two's complement signed integer array.
 *     - `BigUint64Array`: 64-bit unsigned integer array.
 *     - `Float32Array`: 32-bit IEEE floating point number array.
 *     - `Float64Array`: 64-bit IEEE floating point number array.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @return {TypedArray}
 *     The cloned typed array.
 * @private
 * @author Haixing Hu
 */
function cloneTypedArray(source, options, cache) {
  // the TypedArray provides a copy constructor
  const result = new source.constructor(source);
  // add to the cache to avoid circular references
  cache.set(source, result);
  // copy other monkey patched properties
  copyProperties(source, result, options, cache);
  return result;
}

export default cloneTypedArray;
