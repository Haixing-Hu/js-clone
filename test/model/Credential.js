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
 * 此模型表示证件信息。
 *
 * @author 胡海星
 */
class Credential {
  /**
   * 创建一个新的{@link Credential}对象。
   *
   * @param {String} type
   *     新的{@link Credential}对象的证件类型，如不提供则使用默认值身份证。
   * @param {String} number
   *     新的{@link Credential}对象的证件号码，如不提供则使用默认值空字符串。
   */
  constructor(type = CredentialType.IDENTITY_CARD.value, number = '') {
    this.type = type;
    this.number = number;
  }
}

export default Credential;
