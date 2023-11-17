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
 * Copies the properties of the source object to the target object.
 *
 * **NOTE:** In order to support the reactivity of Vue.js, we only copy the
 * enumerable properties of the object, and do not consider the getters and
 * setters of the object. We directly take out the property value from the
 * source object (possibly by calling the getter), recursively deep-clone it
 * and copy it to the target object (possibly by calling the setter). Therefore,
 * the `includeAccessor` and `includeNonEnumerable` parameters of options should
 * not be set or should be set to `false`.
 *
 * For the reactivity of Vue.js, see:
 * <a href="https://v2.vuejs.org/v2/guide/reactivity.html">Reactivity</a>
 *
 * @param {Object} source
 *     The source object.
 * @param {Object} target
 *     The target object.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @see https://v2.vuejs.org/v2/guide/reactivity.html
 * @author Haixing Hu
 * @private
 */
function mirror(source, target, options, cache) {
  const keys = Reflect.ownKeys(source);
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if ((!options.includeNonConfigurable) && (!descriptor.configurable)) {
      continue; // ignore non-configurable properties, such as string[0]
    }
    if ((!options.includeNonEnumerable) && (!descriptor.enumerable)) {
      continue; // ignore non-enumerable properties
    }
    if ((options.excludeReadonly)
        && (descriptor.writable !== undefined)
        && (!descriptor.writable)) {
      continue; // ignore readonly properties
    }
    if (options.includeAccessor && (descriptor.get || descriptor.set)) {
      Object.defineProperty(target, key, descriptor);
      continue;
    }
    // use [] to get property value instead of descriptor.value, since if
    // the property has getter/setter, descriptor.value do not exist, and
    // use [] will invoke the getter, which is just what we want.
    const value = source[key];
    // eslint-disable-next-line no-use-before-define
    target[key] = cloneImpl(value, options, cache); // recursive call
  }
}

export default mirror;
