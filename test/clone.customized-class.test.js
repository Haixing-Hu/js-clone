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

/**
 * Unit test the `clone()` function to clone objects of a customized class
 * with naming conversion.
 *
 * @author Haixing Hu
 */
describe('clone objects of a customized class with naming conversion', () => {
  test('clone(object, { convertNaming: true })', () => {
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
    const result = clone(obj, {
      convertNaming: true,
      sourceNamingStyle: 'LOWER_UNDERSCORE',
      targetNamingStyle: 'LOWER_CAMEL',
    });
    expect(result).toBeInstanceOf(Object);
    expect(result.firstField).toBe(obj.first_field);
    expect(result.secondField).toBeInstanceOf(Object);
    expect(result.secondField.firstChildField).toBe(obj.second_field.first_child_field);
    expect(result.secondField.secondChildField).toBeInstanceOf(Object);
    expect(result.secondField.secondChildField.thePerson).toBeInstanceOf(Person);
    expectAlike(result.secondField.secondChildField.thePerson, person);
  });
  test('clone(object, { convertNaming: true }), no targetNamingStyle', () => {
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
    const result = clone(obj, {
      convertNaming: true,
      sourceNamingStyle: 'LOWER_UNDERSCORE',
    });
    expect(result).toBeInstanceOf(Object);
    expect(result.firstField).toBe(obj.first_field);
    expect(result.secondField).toBeInstanceOf(Object);
    expect(result.secondField.firstChildField).toBe(obj.second_field.first_child_field);
    expect(result.secondField.secondChildField).toBeInstanceOf(Object);
    expect(result.secondField.secondChildField.thePerson).toBeInstanceOf(Person);
    expectAlike(result.secondField.secondChildField.thePerson, person);
  });
  test('clone(object, { convertNaming: true }), no sourceNamingStyle', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    class Foo {
      firstField = 'first-field';

      secondField = {
        firstChildField: 'first-child-field',
        secondChildField: {
          thePerson: person,
        },
      };
    }
    const obj = new Foo();
    const result = clone(obj, {
      convertNaming: true,
      targetNamingStyle: 'LOWER_UNDERSCORE',
    });
    expect(result).toBeInstanceOf(Foo);
    expect(result.first_field).toBe(obj.firstField);
    expect(result.second_field).toBeInstanceOf(Object);
    expect(result.second_field.first_child_field).toBe(obj.secondField.firstChildField);
    expect(result.second_field.second_child_field).toBeInstanceOf(Object);
    expect(result.second_field.second_child_field.the_person).toBeInstanceOf(Person);
    expectAlike(result.second_field.second_child_field.the_person, person);
  });
  test('clone(object, { convertNaming: true, pojo: true }), no sourceNamingStyle', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    class Foo {
      firstField = 'first-field';

      secondField = {
        firstChildField: 'first-child-field',
        secondChildField: {
          thePerson: person,
        },
      };
    }
    const obj = new Foo();
    const result = clone(obj, {
      convertNaming: true,
      targetNamingStyle: 'LOWER_UNDERSCORE',
      pojo: true,
    });
    expect(result).toBeInstanceOf(Object);
    expect(result.first_field).toBe(obj.firstField);
    expect(result.second_field).toBeInstanceOf(Object);
    expect(result.second_field.first_child_field).toBe(obj.secondField.firstChildField);
    expect(result.second_field.second_child_field).toBeInstanceOf(Object);
    expect(result.second_field.second_child_field.the_person).toBeInstanceOf(Object);
    expectAlike(result.second_field.second_child_field.the_person, person);
  });

  test('clone(object, { convertNaming: true, pojo: true, removeEmptyFields: true })', () => {
    const person = new Person();
    person.id = '0';
    person.name = undefined;
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = null;
    person.birthday = '';
    person.mobile = '12039495';
    person.email = '';
    class Foo {
      firstField = 'first-field';

      secondField = {
        firstChildField: 'first-child-field',
        secondChildField: {
          thePerson: person,
        },
        emptyMapValue: new Map(),
        nonEmptyMapValue: new Map([['a', 1], ['b', 2], ['c', 3]]),
      };

      emptyArrayValue = [];

      emptySetValue = new Set();

      nonEmptyArrayValue = [1, 2, 3];

      nonEmptySetValue = new Set([1, 2, 3]);
    }
    const obj = new Foo();
    const result = clone(obj, {
      convertNaming: true,
      targetNamingStyle: 'LOWER_UNDERSCORE',
      pojo: true,
      removeEmptyFields: true,
    });
    expect(result).toBeInstanceOf(Object);
    expect(result.first_field).toBe(obj.firstField);
    expect(result.second_field).toBeInstanceOf(Object);
    expect(result.second_field.first_child_field).toBe(obj.secondField.firstChildField);
    expect(result.second_field.second_child_field).toBeInstanceOf(Object);
    expect(result.second_field.second_child_field.the_person).toBeInstanceOf(Object);
    expect(result.second_field.second_child_field.the_person.id).toBe(person.id);
    expect(Object.hasOwn(result.second_field.second_child_field.the_person, 'name')).toBe(false);
    expect(result.second_field.second_child_field.the_person.credential).toBeInstanceOf(Object);
    expect(result.second_field.second_child_field.the_person.credential.type).toBe(person.credential.type);
    expect(result.second_field.second_child_field.the_person.credential.number).toBe(person.credential.number);
    expect(Object.hasOwn(result.second_field.second_child_field.the_person, 'gender')).toBe(false);
    expect(Object.hasOwn(result.second_field.second_child_field.the_person, 'birthday')).toBe(false);
    expect(result.second_field.second_child_field.the_person.mobile).toBe(person.mobile);
    expect(Object.hasOwn(result.second_field.second_child_field.the_person, 'email')).toBe(false);
    expect(Object.hasOwn(result.second_field, 'empty_map_value')).toBe(false);
    expect(result.second_field.non_empty_map_value).toBeInstanceOf(Map);
    expect(result.second_field.non_empty_map_value).toEqual(obj.secondField.nonEmptyMapValue);
    expect(Object.hasOwn(result, 'empty_array_value')).toBe(false);
    expect(Object.hasOwn(result, 'empty_set_value')).toBe(false);
    expect(result.non_empty_array_value).toEqual(obj.nonEmptyArrayValue);
    expect(result.non_empty_set_value).toEqual(obj.nonEmptySetValue);
  });
});
