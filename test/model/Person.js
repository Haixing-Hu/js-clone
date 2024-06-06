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
 * This model represents personal information.
 *
 * @author Haixing Hu
 */
class Person {
  /**
   * Create a {@link Person} object.
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
