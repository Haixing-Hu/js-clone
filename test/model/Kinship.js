////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * This enumeration represents the relationship between the insured and the
 * policyholder.
 *
 * @author Haixing Hu
 */
const Kinship = {
  SELF: {
    name: 'Personal',
    value: 'SELF',
  },
  PARENT: {
    name: 'Parents',
    value: 'PARENT',
  },
  CHILD: {
    name: 'Child',
    value: 'CHILD',
  },
  SPOUSE: {
    name: 'Spouse',
    value: 'SPOUSE',
  },
  OTHER: {
    name: 'Other',
    value: 'OTHER',
  },
};

export default Kinship;
