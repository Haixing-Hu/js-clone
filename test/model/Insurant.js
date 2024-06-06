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
 * This model represents the insured person information.
 *
 * @author Haixing Hu
 */
class Insurant extends Person {
  /**
   * Create a {@link Insurant} object.
   */
  constructor() {
    super();
    this.guardian = null;
    this.kinship = null;
  }
}

export default Insurant;
