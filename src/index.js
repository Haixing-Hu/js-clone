////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from './clone';
import registerCloneHook from './register-clone-hook';
import unregisterCloneHook from './unregister-clone-hook';
import cloneImpl from './impl/clone-impl';
import copyProperties from './impl/copy-properties';
import DEFAULT_CLONE_OPTIONS from './default-clone-options';

export {
  clone,
  cloneImpl,
  copyProperties,
  registerCloneHook,
  unregisterCloneHook,
  DEFAULT_CLONE_OPTIONS,
};

export default clone;
