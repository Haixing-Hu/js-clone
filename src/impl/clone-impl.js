////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import typeInfo from '@haixing_hu/typeinfo';
import CLONE_HOOKS from './clone-hooks';
import cloneObjectImpl from './clone-object-impl';

/**
 * The implementation of the `clone` function.
 *
 * @param {any} source
 *     The object to be cloned.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @return {any}
 *     The deep clone of the specified object.
 * @author Haixing Hu
 */
function cloneImpl(source, options, cache) {
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
  for (const hook of CLONE_HOOKS) {
    const result = hook(info, source, options);
    if (result !== undefined && result !== null) {
      cache.set(source, result);
      return result;
    }
  }
  // clone the general object
  return cloneObjectImpl(info, source, options, cache);
}

export default cloneImpl;
