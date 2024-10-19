////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
/* eslint-disable import/no-cycle */
import typeInfo from '@haixing_hu/typeinfo';
import CLONE_HOOKS from './clone-hooks';
import cloneObjectImpl from './clone-object-impl';

/**
 * The implementation of the `clone` function.
 *
 * @param {any} source
 *     The source object to be cloned.
 * @param {string} key
 *     The key of the source object in its parent object.
 *     This parameter is used to support the `toJSON()` method.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @return {any}
 *     The deep clone of the specified object.
 * @private
 * @author Haixing Hu
 */
function cloneImpl(source, key, options, cache) {
  if (options.useToJSON && (typeof source.toJSON === 'function')) {
    return source.toJSON(key);
  }
  const info = typeInfo(source);
  switch (info.type) {
    case 'undefined':               // drop down
    case 'null':                    // drop down
    case 'boolean':                 // drop down
    case 'number':                  // drop down
    case 'string':                  // drop down
    case 'symbol':                  // drop down
    case 'bigint':                  // drop down
      return source;                // don't need to clone immutable primitives
    case 'function':
      return source;                // we do NOT clone functions, since it could cause too much troubles
    case 'object':                  // drop down
    default:
      break;
  }
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  // deal with cloning hooks
  if (!options.disableHooks) {
    for (const hook of CLONE_HOOKS) {
      const result = hook(info, source, options);
      if (result !== undefined && result !== null) {
        cache.set(source, result);
        return result;
      }
    }
  }
  // clone the general object
  return cloneObjectImpl(info, source, options, cache);
}

export default cloneImpl;
