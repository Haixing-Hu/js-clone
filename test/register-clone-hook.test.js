////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  clone,
  copyProperties,
  registerCloneHook,
  unregisterCloneHook,
} from '../src';
import Credential from './model/Credential';
import Person from './model/Person';

/**
 * Unit test the `clone()` function with registered clone hooks.
 *
 * @author Haixing Hu
 */
describe('clone built-in arguments object', () => {
  test('Test register/unregister a clone hook', () => {
    let hookCalls = 0;
    function credentialHook(info, obj) {
      if (info.constructor === Credential) {
        ++hookCalls;
        return obj;
      }
      return null;
    }
    registerCloneHook(credentialHook);
    expect(hookCalls).toBe(0);
    const credential = new Credential();
    expect(clone(credential)).toBe(credential);
    expect(hookCalls).toBe(1);
    const obj = {
      x: 1,
      c: new Credential(),
    };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned.c).toBe(obj.c);
    expect(hookCalls).toBe(2);
    unregisterCloneHook(credentialHook);
    expect(clone(credential)).not.toBe(credential);
    expect(hookCalls).toBe(2);
    const cloned2 = clone(obj);
    expect(cloned2).toEqual(obj);
    expect(cloned2.c).not.toBe(obj.c);
    expect(hookCalls).toBe(2);
  });
  test('Test register/unregister more than one clone hooks', () => {
    let credentialHookCalls = 0;
    function credentialHook(info, obj) {
      if (info.constructor === Credential) {
        ++credentialHookCalls;
        return obj;
      }
      return null;
    }
    registerCloneHook(credentialHook);
    let personHookCalls = 0;
    function personHook(info, obj, options) {
      if (info.constructor === Person) {
        ++personHookCalls;
        const result = new Person();
        const cache = new WeakMap();
        copyProperties(obj, result, 0, options, cache);
        return result;
      }
      return null;
    }
    registerCloneHook(personHook);
    expect(credentialHookCalls).toBe(0);
    const credential = new Credential();
    credential.number = '11111';
    expect(clone(credential)).toBe(credential);
    expect(credentialHookCalls).toBe(1);
    expect(personHookCalls).toBe(0);
    const person = new Person();
    person.name = 'Bill Gates';
    const cloned = clone(person);
    expect(cloned).toEqual(person);
    expect(person.credential).toBe(person.credential);
    expect(credentialHookCalls).toBe(2);
    expect(personHookCalls).toBe(1);
    unregisterCloneHook(credentialHook);
    expect(clone(credential)).not.toBe(credential);
    expect(credentialHookCalls).toBe(2);
    const cloned2 = clone(person);
    expect(cloned2).toEqual(person);
    expect(cloned2.credential).not.toBe(person.credential);
    expect(credentialHookCalls).toBe(2);
    expect(personHookCalls).toBe(2);
    unregisterCloneHook(personHook);
  });
  test('Test register a non-function hook', () => {
    expect(() => registerCloneHook(null)).toThrow(TypeError);
    expect(() => registerCloneHook(undefined)).toThrow(TypeError);
    expect(() => registerCloneHook(1)).toThrow(TypeError);
    expect(() => registerCloneHook('abc')).toThrow(TypeError);
    expect(() => registerCloneHook(true)).toThrow(TypeError);
    expect(() => registerCloneHook(false)).toThrow(TypeError);
    expect(() => registerCloneHook([])).toThrow(TypeError);
    expect(() => registerCloneHook({})).toThrow(TypeError);
  });
  test('Test unregister a non-function hook', () => {
    expect(() => unregisterCloneHook(null)).toThrow(TypeError);
    expect(() => unregisterCloneHook(undefined)).toThrow(TypeError);
    expect(() => unregisterCloneHook(1)).toThrow(TypeError);
    expect(() => unregisterCloneHook('abc')).toThrow(TypeError);
    expect(() => unregisterCloneHook(true)).toThrow(TypeError);
    expect(() => unregisterCloneHook(false)).toThrow(TypeError);
    expect(() => unregisterCloneHook([])).toThrow(TypeError);
    expect(() => unregisterCloneHook({})).toThrow(TypeError);
  });
  test('Test unregister a non-existing hook', () => {
    let hookCalls = 0;
    function credentialHook(info, obj) {
      if (info.constructor === Credential) {
        ++hookCalls;
        return obj;
      }
      return null;
    }
    expect(unregisterCloneHook(credentialHook)).toBe(false);
    expect(hookCalls).toBe(0);
    registerCloneHook(credentialHook);
    expect(unregisterCloneHook(credentialHook)).toBe(true);
    expect(hookCalls).toBe(0);
  });

  test('Test register a clone hook but disable hooks while cloning', () => {
    let hookCalls = 0;
    function credentialHook(info, obj) {
      if (info.constructor === Credential) {
        ++hookCalls;
        return obj;
      }
      return null;
    }
    registerCloneHook(credentialHook);
    expect(hookCalls).toBe(0);
    const credential = new Credential();
    expect(clone(credential)).toBe(credential);
    expect(hookCalls).toBe(1);
    const obj = {
      x: 1,
      c: new Credential(),
    };
    const cloned = clone(obj, { disableHooks: true });
    expect(hookCalls).toBe(1);
    expect(cloned).toEqual(obj);
    expect(cloned.c).toEqual(obj.c);
  });
});
