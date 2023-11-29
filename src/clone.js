////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import cloneImpl from './clone-impl';

/**
 * Deep clones a value or an object.
 *
 * **NOTE:** In order to support the reactivity of Vue.js, we only copy the
 * enumerable properties of the object, and do not consider the getters and
 * setters of the object. We directly take out the property value from the
 * source object (possibly by calling the getter), recursively deep-clone it
 * and copy it to the target object (possibly by calling the setter).
 *
 * The cloning algorithm have the following options:
 *
 * - `includeAccessor` - If this options is set to `true`, the cloning algorithm
 *   will clone the accessors of the properties (i.e. getters and setters) from
 *   the source object. The default value of this option is `false`.
 * - `excludeReadonly` - If this options is set to `true`, the cloning algorithm
 *   will NOT clone the readonly attributes from the source object. The default
 *   value of this option is `false`.
 * - `includeNonEnumerable` - If this options is set to `true`, the cloning
 *   algorithm will clone the non-enumerable attributes from the source object.
 *   The default value of this option is `false`.
 * - `includeNonConfigurable` - If this options is set to `true`, the cloning
 *   algorithm will clone the non-configurable attributes from the source
 *   object. The default value of this option is `false`.
 *
 * @param {any} source
 *     The value or object to be cloned.
 * @param {Object} options
 *     Optional argument, representing the options of the cloning algorithm.
 *     The default value is `{}`.
 * @return {any}
 *     The deep clone of the specified value or object.
 * @author Haixing Hu
 */
function clone(source, options = {}) {
  // We want to preserve correct structure in objects with tricky references,
  // e.g. cyclic structures or structures with two references to the same object.
  // To do this, we'll cache the results of this function during this invocation,
  // and return from this cache when possible.
  // Note that we only store certain values, like Arrays or plain object.
  const cache = new WeakMap();
  return cloneImpl(source, options, cache);
}

export default clone;
