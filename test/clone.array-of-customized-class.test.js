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

/**
 * Unit test the `clone()` function to clone an array of objects of a customized
 * class with naming conversion.
 *
 * @author Haixing Hu
 */
describe('clone array of customized class with naming conversion', () => {
  test('clone([object], { convertNaming: true })', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    const obj = {
      first_field: 'first-field',
      second_field: {
        first_child_field: 'first-child-field',
        second_child_field: {
          the_person: person,
        },
      },
    };
    const result = clone([obj], {
      convertNaming: true,
      sourceNamingStyle: 'LOWER_UNDERSCORE',
      targetNamingStyle: 'LOWER_CAMEL',
    });
    expect(result).toBeArray();
    expect(result.length).toBe(1);
    expect(result[0]).toBeInstanceOf(Object);
    expect(result[0].firstField).toBe(obj.first_field);
    expect(result[0].secondField).toBeInstanceOf(Object);
    expect(result[0].secondField.firstChildField).toBe(obj.second_field.first_child_field);
    expect(result[0].secondField.secondChildField).toBeInstanceOf(Object);
    expect(result[0].secondField.secondChildField.thePerson).toBeInstanceOf(Person);
    expectAlike(result[0].secondField.secondChildField.thePerson, person);
  });
});
