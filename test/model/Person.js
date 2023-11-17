////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import Credential from './Credential';

/**
 * 此模型表示个人信息。
 *
 * @author 胡海星
 */
class Person {
  /**
   * 创建一个{@link Person}对象
   */
  constructor() {
    this.id = '';
    this.name = '';
    this.credential = new Credential();
    this.gender = '';
    this.birthday = '';
    this.mobile = '';
    this.email = '';
  }
}

export default Person;
