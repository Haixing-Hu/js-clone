////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 此枚举表示证件类型
 *
 * @author 胡海星
 */
const CredentialType = {
  IDENTITY_CARD: {
    name: '身份证',
    value: 'IDENTITY_CARD',
  },

  PASSPORT: {
    name: '护照',
    value: 'PASSPORT',
  },

  OFFICER_CARD: {
    name: '中国人民解放军军官证',
    value: 'OFFICER_CARD',
  },

  POLICE_CARD: {
    name: '中国人民武装警察警官证',
    value: 'POLICE_CARD',
  },

  TAIWAN_RETURN_PERMIT: {
    name: '台湾居民来往大陆通行证',
    value: 'TAIWAN_RETURN_PERMIT',
  },

  FOREIGNER_PERMANENT_RESIDENCE_PERMIT: {
    name: '外国人永久居住证',
    value: 'FOREIGNER_PERMANENT_RESIDENCE_PERMIT',
  },

  OTHER: {
    name: '其他证件',
    value: 'OTHER',
  },
};

export default CredentialType;
