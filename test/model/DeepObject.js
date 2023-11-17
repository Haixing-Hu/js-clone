////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import ShallowObject from './ShallowObject';

class DeepObject {
  constructor(description = '', price = 0, name = '', value = 0) {
    this.description = description;
    this.price = price;
    this.shallow = new ShallowObject(name, value);
  }
}

export default DeepObject;
