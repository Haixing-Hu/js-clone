////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import CredentialType from './CredentialType';

/**
 * This model represents document information.
 *
 * @author Haixing Hu
 */
class Credential {
  /**
   * Creates a new {@link Credential} object.
   *
   * @param {String} type
   *     The credential type of the new {@link Credential} object. If not
   *     provided, the default value ID card is used.
   * @param {String} number
   *     The credential number of the new {@link Credential} object. If not
   *     provided, the default value is an empty string.
   */
  constructor(type = CredentialType.IDENTITY_CARD.value, number = '') {
    this.type = type;
    this.number = number;
  }
}

export default Credential;
