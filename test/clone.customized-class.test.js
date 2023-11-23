////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';
import Buyer from './model/Buyer';
import Credential from './model/Credential';
import CredentialType from './model/CredentialType';
import Gender from './model/Gender';
import Guardian from './model/Guardian';
import Insurant from './model/Insurant';
import Kinship from './model/Kinship';
import Person from './model/Person';
import expectAlike from './utils/expect-alike';

/**
 * Unit test the `clone()` function to clone objects of a customized class.
 *
 * @author Haixing Hu
 */
describe('clone objects of a customized class', () => {
  test('clone(Person)', () => {
    const obj = new Person();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone(obj);
    expect(result).toBeInstanceOf(Person);
    expectAlike(result, obj);
  });
  test('clone(Buyer)', () => {
    const obj = new Buyer();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone(obj);
    expect(result).toBeInstanceOf(Buyer);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
  });
  test('clone(Guardian)', () => {
    const obj = new Guardian();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone(obj);
    expect(result).toBeInstanceOf(Guardian);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
  });
  test('clone(Insurant)', () => {
    const obj = new Insurant();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    obj.kinship = Kinship.PARENT.value;
    obj.guardian = new Guardian();
    obj.guardian.id = '1';
    obj.guardian.name = 'guardian';
    obj.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '456');
    obj.guardian.gender = Gender.FEMALE.value;
    obj.guardian.birthday = '1970-02-03';
    obj.guardian.mobile = '383789904';
    obj.guardian.email = 'c@c.com';
    const result = clone(obj);
    expect(result).toBeInstanceOf(Insurant);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
    expectAlike(result.guardian, obj.guardian);
    expectAlike(result.guardian.credential, obj.guardian.credential);
  });
});
