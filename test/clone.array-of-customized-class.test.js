////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';
import Credential from './model/Credential';
import CredentialType from './model/CredentialType';
import Gender from './model/Gender';
import Person from './model/Person';
import expectAlike from './utils/expect-alike';

/**
 * Unit test the `clone()` function to clone an array of objects of a customized
 * class.
 *
 * @author Haixing Hu
 */
describe('clone array of customized class', () => {
  test('clone([Person])', () => {
    const obj = new Person();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone([obj]);
    expect(result).toBeArray();
    expect(result.length).toBe(1);
    expect(result[0]).toBeInstanceOf(Person);
    expectAlike(result[0], obj);
  });
});
