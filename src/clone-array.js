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
 * Clones a specified array.
 *
 * @param {Array} source
 *     The source array.
 * @param {Object} options
 *     Options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Array}
 *     The target array.
 * @author Haixing Hu
 */
function cloneArray(source, options, cache) {
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  const result = [];
  cache.set(source, result);
  const keys = Reflect.ownKeys(source);
  // We'll assume the array is well-behaved (dense and not monkey-patched)
  // If that turns out to be false, we'll fall back to generic code
  wellBehaved: {                  // eslint-disable-line no-labels
    let i;
    for (i = 0; i < source.length; i++) {
      if (i in source) {
        // eslint-disable-next-line no-use-before-define
        result.push(cloneImpl(source[i], options, cache));
      } else {  // Array is sparse
        break wellBehaved;        // eslint-disable-line no-labels
      }
    }
    if (i !== keys.length - 1) {  // Array is monkeypatched
      break wellBehaved;          // eslint-disable-line no-labels
    }
    return result;
  }
  // Generic fallback
  result.length = 0;
  mirror(source, result, options, cache);
  return result;
}

export default cloneArray;
