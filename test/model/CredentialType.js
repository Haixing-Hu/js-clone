////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * This enumeration represents the certificate types.
 *
 * @author Haixing Hu
 */
const CredentialType = {
  IDENTITY_CARD: {
    name: 'ID Card',
    value: 'IDENTITY_CARD',
  },

  PASSPORT: {
    name: 'Passport',
    value: 'PASSPORT',
  },

  OFFICER_CARD: {
    name: 'Chinese People\'s Liberation Army Officer Certificate',
    value: 'OFFICER_CARD',
  },

  POLICE_CARD: {
    name: 'Chinese People\'s Armed Police Officer Certificate',
    value: 'POLICE_CARD',
  },

  TAIWAN_RETURN_PERMIT: {
    name: 'Mainland Travel Permit for Taiwan Residents',
    value: 'TAIWAN_RETURN_PERMIT',
  },

  FOREIGNER_PERMANENT_RESIDENCE_PERMIT: {
    name: 'Permanent Residence Permit for Foreigners',
    value: 'FOREIGNER_PERMANENT_RESIDENCE_PERMIT',
  },

  OTHER: {
    name: 'Other documents',
    value: 'OTHER',
  },
};

export default CredentialType;
