////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { NamingStyle } from '@qubit-ltd/naming-style';

/**
 * Gets the key of the target object from the corresponding key of the source
 * object.
 *
 * @param {string} sourceKey
 *     The key of the source object.
 * @param {object} options
 *     The options of the cloning algorithm.
 * @return {string}
 *     The corresponding key of the target object.
 * @private
 * @author Haixing Hu
 */
function getTargetKey(sourceKey, options) {
  if (options && (options.convertNaming === true)) {
    const sourceNamingStyle = NamingStyle.of(options.sourceNamingStyle);
    const targetNamingStyle = NamingStyle.of(options.targetNamingStyle);
    return sourceNamingStyle.to(targetNamingStyle, sourceKey);
  } else {
    return sourceKey;
  }
}

export default getTargetKey;
