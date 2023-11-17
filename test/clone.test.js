////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';
// import Vue from 'vue';
// import { mount } from '@vue/test-utils';
import CredentialType from './model/CredentialType';
import Credential from './model/Credential';
import Gender from './model/Gender';
import Kinship from './model/Kinship';
import Person from './model/Person';
import Buyer from './model/Buyer';
import Guardian from './model/Guardian';
import Insurant from './model/Insurant';

/* eslint-disable max-classes-per-file */







/**
 * 单元测试 'clone' 函数，针对内置带类型数组
 *
 * @author Haixing Hu
 */
describe('clone typed arrays et al', () => {
  describe('ArrayBuffer', () => {
    test('simple', () => {
      const buffer = new ArrayBuffer(32);
      expectAlike(clone(buffer), buffer);
    });
    testMonkeyPatched(new ArrayBuffer(16));
  });
  describe('SharedArrayBuffer', () => {
    // Doesn't really seem to be any way to it these? :/
  });
  describe('DataView', () => {
    test('simple', () => {
      const buffer = new ArrayBuffer(32);
      const view = new DataView(buffer, 1, 16);
      const cloned = clone(view);
      expectAlike(cloned, view);
      expect(cloned.buffer).not.toBe(view.buffer);
      cloned.setInt16(0, 12);
      expect(view.getInt16(0)).not.toBe(12);
      expect(view.getInt16(1)).not.toBe(12);
    });
    testMonkeyPatched(new DataView(new ArrayBuffer(16)));
  });

  function testTypedArray(constructor, sampleValue) {
    describe(constructor.name, () => {
      test('empty', () => {
        const empty = new constructor(32);
        expectAlike(clone(empty), empty);
      });
      test('nonempty', () => {
        const nonempty = new constructor(32);
        nonempty[0] = sampleValue;
        nonempty[15] = sampleValue;
        nonempty[31] = sampleValue;
        expectAlike(clone(nonempty), nonempty);
      });
      const array = new constructor(32);
      array[0] = sampleValue;
      array[15] = sampleValue;
      array[31] = sampleValue;
      testMonkeyPatched(array);
    });
  }

  describe('typed arrays', () => {
    testTypedArray(BigInt64Array, 12n);     // eslint-disable-line no-undef
    testTypedArray(BigUint64Array, 12n);    // eslint-disable-line no-undef
    testTypedArray(Float32Array, 3.14);
    testTypedArray(Float64Array, 3.14);
    testTypedArray(Int8Array, 12);
    testTypedArray(Int16Array, 12);
    testTypedArray(Int32Array, 12);
    testTypedArray(Uint8Array, 12);
    testTypedArray(Uint8ClampedArray, 12);
    testTypedArray(Uint16Array, 12);
    testTypedArray(Uint32Array, 12);
  });
});

/**
 * 单元测试 'clone' 函数，针对内置Error类
 *
 * @author Haixing Hu
 */


/**
 * 单元测试 'clone' 函数，针对对象
 *
 * @author Haixing Hu
 */
describe('clone plain and custom objects', () => {
  test('empty', () => {
    const empty = {};
    expectAlike(clone(empty), empty);
  });
  test('nonempty', () => {
    const nonempty = { left: 'right', up: 'down', red: 'blue' };
    expectAlike(clone(nonempty), nonempty);
  });
  test('nested', () => {
    const nested = { child: { val: 'val!' } };
    expectAlike(clone(nested), nested);
  });
  test('cyclic', () => {
    const object = { };
    object.self = object;
    const cloned = clone(object);
    expect(cloned).not.toBe(object);
    expect(cloned.self).toBe(cloned);
  });
  test('diamond', () => {
    const child = { i_am: 'child' };
    const parent = { left: child, right: child };
    const cloned = clone(parent);
    expectAlike(cloned, parent);
    expect(cloned.left).toBe(cloned.right);
  });
  test('with non-string keys', () => {
    const key = Symbol('kk');
    const nonempty = { [key]: 'val' };
    expectAlike(clone(nonempty), nonempty);
  });
  test('function prototype instances with no hierarchy', () => {
    function Pair(left, right) {
      this.left = left;
      this.right = right;
    }
    const pair = new Pair(3, 4);
    expectAlike(clone(pair), pair);
  });
  test('with prototype from Object.create', () => {
    const proto = {
      delimiter: ', ',
      toString() {
        return this.items.join(this.delimiter);
      },
    };
    const object = Object.create(proto);
    object.items = [1, 2, 3];
    expectAlike(clone(object), object);
  });
  test('with prototype from Object.create(null)', () => {
    const object = Object.create(null);
    object.items = [1, 2, 3];
    expect(Object.getPrototypeOf(object)).toBeNull();
    expectAlike(clone(object), object);
  });
  test('ES6 class instances with no hierarchy', () => {
    class Pair {
      constructor(left, right) {
        this.left = left;
        this.right = right;
      }
    }
    const pair = new Pair(3, 4);
    expectAlike(clone(pair), pair);
  });
  test('ES6 classes with hierarchy', () => {
    class Parent {
      constructor(pValue) {
        this.pValue = pValue;
      }
    }
    class Child extends Parent {
      constructor(pValue, cValue) {
        super(pValue);
        this.cValue = cValue;
      }
    }
    const child = new Child('pValue', 'cValue');
    expectAlike(clone(child), child);
  });
  test('with getters, include accessor, include non enumerable', () => {
    const object = { val: 'got' };
    Object.defineProperty(object, 'getter', {
      configurable: true,
      get() { return this.val; },
    });
    const cloned = clone(object, {
      includeAccessor: true,
      includeNonEnumerable: true,
    });
    expectAlike(cloned, object);
    cloned.val = 'not';
    expect(cloned.getter).toBe('not');
  });
  test('with getters, default options', () => {
    const object = { val: 'got' };
    Object.defineProperty(object, 'getter', {
      configurable: true,
      enumerable: true,
      get() { return this.val; },
    });
    const cloned = clone(object);
    expectAlike(cloned, object);
    cloned.val = 'not';
    expect(cloned.getter).toBe('got');
  });
});

/**
 * 单元测试 'clone' 函数，针对用户自定义对象
 *
 * @author Haixing Hu
 */
describe('clone customized class', () => {
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
    expectInstanceOf(result, Person);
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
    expectInstanceOf(result, Buyer);
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
    expectInstanceOf(result, Guardian);
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
    expectInstanceOf(result, Insurant);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
    expectAlike(result.guardian, obj.guardian);
    expectAlike(result.guardian.credential, obj.guardian.credential);
  });
});

/**
 * 单元测试 'clone' 函数，针对自定义属性的类
 *
 * @author Haixing Hu
 */
describe('clone class with defined properties', () => {
  class Gender {}
  Object.defineProperty(Gender.prototype, 'name', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '',
  });
  Object.defineProperty(Gender.prototype, 'value', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '',
  });
  Gender.MALE = new Gender();
  Gender.MALE.name = '男';
  Gender.MALE.value = 'MALE';
  Object.freeze(Gender.MALE);

  Gender.FEMALE = new Gender();
  Gender.FEMALE.name = '男';
  Gender.FEMALE.value = 'FEMALE';
  Object.freeze(Gender.FEMALE);

  test('clone()', () => {
    const male = Gender.MALE;
    const copy = clone(male, { includeReadonly: true, includeNonConfigurable: true });
    expect(copy).toEqual(male);
  });
});

/**
 * 单元测试 'clone' 函数，针对被Vue.js托管的数组属性。
 *
 * @author Haixing Hu
 */
// describe('clone被Vue托管数组', () => {
//   test('clone正常的数组', () => {
//     const array = [1, 2, 3];
//     const result = clone(array);
//     console.log('result = ', result);
//     expect(result).toBeDefined();
//     expect(result).not.toBeNull();
//     expect(result).toBeArray();
//     expect(result.length).toBe(3);
//     expect(result).toEqual([1, 2, 3]);
//   });
//   const Wrapper = Vue.extend({
//     data() {
//       return {
//         array: [1, 2, 3],
//       };
//     },
//     template: '<div>length = {{array.length}}</div>',
//   });
//   test('clone被Vue托管数组', () => {
//     const wrapper = mount(Wrapper);
//     expect(wrapper.vm.array).toBeDefined();
//     expect(wrapper.vm.array).not.toBeNull();
//     expect(wrapper.vm.array).toBeArray();
//     expect(wrapper.vm.array.length).toBe(3);
//     console.log('wrapper.vm.array = ', wrapper.vm.array);
//     const result = clone(wrapper.vm.array);
//     console.log('result = ', result);
//     expect(result).toBeDefined();
//     expect(result).not.toBeNull();
//     expect(result).toBeArray();
//     expect(result.length).toBe(3);
//     expect(result).toEqual([1, 2, 3]);
//   });
// });

/**
 * 单元测试 'clone' 函数，针对用户自定义对象
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
