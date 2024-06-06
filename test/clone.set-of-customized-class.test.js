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
 * Unit test the `clone()` function to clone built-in `Set` of customized class.
 *
 * @author Haixing Hu
 */
describe('clone built-in Set of customized class', () => {
  test('clone(Set<Person>)', () => {
    const obj = new Person();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const set = new Set();
    set.add(obj);
    const result = clone(set);
    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(1);
    const iter = result.values()
    const value = iter.next().value;
    expect(value).toBeInstanceOf(Person);
    expectAlike(value, obj);
  });
});

/**
 * Unit test the `clone()` function to clone built-in `Set` of customized class
 * with naming conversion.
 *
 * @author Haixing Hu
 */
describe('clone built-in Set of customized class with naming conversion', () => {
  test('clone(Set<object>, { convertNaming: true })', () => {
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
      }
    };
    const set = new Set();
    set.add(obj);
    const result = clone(set, {
      convertNaming: true,
      sourceNamingStyle: 'LOWER_UNDERSCORE',
      targetNamingStyle: 'LOWER_CAMEL',
    });
    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(1);
    const iter = result.values()
    const value = iter.next().value;
    expect(value).toBeInstanceOf(Object);
    expect(value.firstField).toBe(obj.first_field);
    expect(value.secondField).toBeInstanceOf(Object);
    expect(value.secondField.firstChildField).toBe(obj.second_field.first_child_field);
    expect(value.secondField.secondChildField).toBeInstanceOf(Object);
    expect(value.secondField.secondChildField.thePerson).toBeInstanceOf(Person);
    expectAlike(value.secondField.secondChildField.thePerson, person);
  });
});
