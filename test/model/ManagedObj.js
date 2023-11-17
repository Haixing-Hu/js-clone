////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import Credential from './Credential';

class ManagedObj {
  intField = 0;

  strField = 'hello';

  strArray = ['a', 'b', 'c'];

  objField = new Credential('IDENTITY_CARD', '123');

  objArray = [new Credential('IDENTITY_CARD', '123'), new Credential('PASSPORT', 'abc')];

  arrayArray = [
    [new Credential('IDENTITY_CARD', '123'), new Credential('PASSPORT', 'abc')],
    [new Credential('IDENTITY_CARD', '456'), new Credential('PASSPORT', 'def')],
  ];
}

export default ManagedObj;
