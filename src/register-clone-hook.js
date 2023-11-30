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
 * function cloneHook(obj, options);
 * ```
 * where:
 * - `obj` is the object to be cloned, which is always a non-nullish object.
 * - `options` is the options of the cloning algorithm.
 *
 * The hook function should firstly check whether the specified object should be
 * cloned by itself; if so, the hook function should return the deep clone of
 * the specified object; otherwise, the hook function should return `null`.
 *
 * @param {function} hook
 *     the hook function to be registered.
 * @see unregisterCloneHook
 * @author Haixing Hu
 */
function registerCloneHook(hook) {
  CLONE_HOOKS.push(hook);
}

export default registerCloneHook;
