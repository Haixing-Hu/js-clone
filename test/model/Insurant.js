////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import Person from './Person';

/**
 * 此模型表示被保人信息。
 *
 * @author 胡海星
 */
class Insurant extends Person {
  /**
   * 创建一个{@link Insurant}对象
   */
  constructor() {
    super();
    this.guardian = null;
    this.kinship = null;
  }
}

export default Insurant;
