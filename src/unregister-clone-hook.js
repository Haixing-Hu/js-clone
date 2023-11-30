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
 * Unregisters a hook function for cloning customized objects.
 *
 * @param {function} hook
 *     the hook function to be unregistered.
 * @return {boolean}
 *     `true` if the hook function is unregistered successfully;
 *     `false` if the hook function is not registered.
 * @see registerCloneHook
 * @author Haixing Hu
 */
function unregisterCloneHook(hook) {
  const index = CLONE_HOOKS.indexOf(hook);
  if (index >= 0) {
    CLONE_HOOKS.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

export default unregisterCloneHook;
