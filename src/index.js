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

export {
  clone,
  cloneImpl,
  copyProperties,
  registerCloneHook,
  unregisterCloneHook,
};

export default clone;
