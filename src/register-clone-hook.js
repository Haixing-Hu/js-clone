////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import CLONE_HOOKS from './impl/clone-hooks';

/**
 * Registers a hook function for cloning customized objects.
 *
 * The hook function should have the following signature:
 * ```js
 * function cloneHook(info, obj, options);
 * ```
 * where:
 * - `info` is the type information about the object to be cloned, which was
 *   retrieved by the `typeInfo()` function.
 * - `obj` is the object to be cloned, which is always a non-nullish object.
 * - `options` is the options of the cloning algorithm.
 *
 * The hook function should firstly check whether the specified object should be
 * cloned by itself; if so, the hook function should return the deep clone of
 * the specified object; otherwise, the hook function should return `null` or
 * `undefined`.
 *
 * The hook function can use the type information provided by the `info` argument
 * to determine whether the specified object should be cloned by itself. For
 * example:
 * ```js
 * function credentialCloneHook(info, obj, options) {
 *   if (info.constructor === Credential) {
 *     return obj;
 *   }
 *   return null;
 * }
 * ```
 * Note that in the above example code, we use the `info.constructor` to determine
 * whether the specified object is an instance of the `Credential` class. This
 * is because the `info.constructor` is the constructor function of the
 * specified object, which is the same as the `constructor` property of the
 * specified object. It is not recommended to use the `info.subtype` to
 * determine the type of the specified object, because the `info.subtype` is
 * the simple name of the class of the object, which may have duplicates.
 *
 * The hook function will be called in the order of their registration, until
 * one of them returns a non-nullish value. If all the registered hook functions
 * return `null` or `undefined`, the default cloning algorithm will be used to
 * clone the specified object.
 *
 * @param {function} hook
 *     the hook function to be registered.
 * @see unregisterCloneHook
 * @author Haixing Hu
 */
function registerCloneHook(hook) {
  if (typeof hook !== 'function') {
    throw new TypeError('The clone hook must be a function.');
  }
  CLONE_HOOKS.push(hook);
}

export default registerCloneHook;
