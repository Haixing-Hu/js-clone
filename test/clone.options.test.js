////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';

/**
 * Unit test the `clone()` function to clone objects with options.
 *
 * @author Haixing Hu
 */
describe('clone objects with options', () => {
  const obj = {
    x: 1,
    y: 2,
    msg: 'hello',
    _name: 'obj',
    get z() {
      return this.x + this.y;
    },
    get name() {
      return this._name;
    },
    set name(s) {
      this._name = s;
    },
  };
  Object.defineProperties(obj, {
    r: {
      value: 'readonly',
      writable: false,
      configurable: true,
      enumerable: true,
    },
  });
  Object.defineProperties(obj, {
    nc: {
      value: 'non-configurable',
      writable: true,
      configurable: false,
      enumerable: true,
    },
  });
  Object.defineProperties(obj, {
    ne: {
      value: 'non-enumerable',
      writable: true,
      configurable: true,
      enumerable: false,
    },
  });
  test('clone with default options', () => {
    const copy = clone(obj);
    expect(copy.x).toBe(1);
    expect(copy.y).toBe(2);
    expect(copy.msg).toBe('hello');
    expect(copy.r).toBe('readonly');
    expect(copy.z).toBe(3);
    expect(typeof copy.z).toBe('number');
    expect(copy.name).toBe('obj');
    expect(typeof copy.name).toBe('string');
    expect(copy._name).toBe('obj');
    expect(typeof copy._name).toBe('string');
    expect('nc' in copy).toBe(false);
    expect('ne' in copy).toBe(false);
  });
  test('clone with includeAccessor = true', () => {
    const options = {
      includeAccessor: true,
      excludeReadonly: false,
      includeNonEnumerable: false,
      includeNonConfigurable: false,
    };
    const copy = clone(obj, options);
    expect(copy.x).toBe(1);
    expect(copy.y).toBe(2);
    expect(copy.msg).toBe('hello');
    expect(copy.r).toBe('readonly');
    expect(copy.z).toBe(3);
    expect(copy._name).toBe('obj');
    expect(copy.name).toBe('obj');
    const zd = Object.getOwnPropertyDescriptor(copy, 'z');
    expect(typeof zd.get).toBe('function');
    expect(typeof zd.set).toBe('undefined');
    expect('value' in zd).toBe(false);
    const nd = Object.getOwnPropertyDescriptor(copy, 'name');
    expect(typeof nd.get).toBe('function');
    expect(typeof nd.set).toBe('function');
    expect('value' in nd).toBe(false);
    copy.name = 'xxx';
    expect(copy.name).toBe('xxx');
    expect(copy._name).toBe('xxx');
    expect('nc' in copy).toBe(false);
    expect('ne' in copy).toBe(false);
  });
  test('clone with includeAccessor = true, excludeReadonly = true', () => {
    const options = {
      includeAccessor: true,
      excludeReadonly: true,
      includeNonEnumerable: false,
      includeNonConfigurable: false,
    };
    const copy = clone(obj, options);
    expect(copy.x).toBe(1);
    expect(copy.y).toBe(2);
    expect(copy.msg).toBe('hello');
    expect('r' in copy).toBe(false);
    expect(copy.z).toBe(3);
    expect(copy._name).toBe('obj');
    expect(copy.name).toBe('obj');
    const zd = Object.getOwnPropertyDescriptor(copy, 'z');
    expect(typeof zd.get).toBe('function');
    expect(typeof zd.set).toBe('undefined');
    expect('value' in zd).toBe(false);
    const nd = Object.getOwnPropertyDescriptor(copy, 'name');
    expect(typeof nd.get).toBe('function');
    expect(typeof nd.set).toBe('function');
    expect('value' in nd).toBe(false);
    copy.name = 'xxx';
    expect(copy.name).toBe('xxx');
    expect(copy._name).toBe('xxx');
    expect('nc' in copy).toBe(false);
    expect('ne' in copy).toBe(false);
  });
  test('clone with includeNonEnumerable = true', () => {
    const options = {
      includeAccessor: false,
      excludeReadonly: false,
      includeNonEnumerable: true,
      includeNonConfigurable: false,
    };
    const copy = clone(obj, options);
    expect(copy.x).toBe(1);
    expect(copy.y).toBe(2);
    expect(copy.msg).toBe('hello');
    expect(copy.r).toBe('readonly');
    expect(copy.z).toBe(3);
    expect(typeof copy.z).toBe('number');
    expect(copy.name).toBe('obj');
    expect(typeof copy.name).toBe('string');
    expect(copy._name).toBe('obj');
    expect(typeof copy._name).toBe('string');
    expect('ne' in copy).toBe(true);
    expect(copy.ne).toBe('non-enumerable');
    expect('nc' in copy).toBe(false);
    copy.ne = 'xxx';
    expect(copy.ne).toBe('xxx');
  });
  test('clone with includeNonEnumerable = true, includeNonConfigurable = true', () => {
    const options = {
      includeAccessor: false,
      excludeReadonly: false,
      includeNonEnumerable: true,
      includeNonConfigurable: true,
    };
    const copy = clone(obj, options);
    expect(copy.x).toBe(1);
    expect(copy.y).toBe(2);
    expect(copy.msg).toBe('hello');
    expect(copy.r).toBe('readonly');
    expect(copy.z).toBe(3);
    expect(typeof copy.z).toBe('number');
    expect(copy.name).toBe('obj');
    expect(typeof copy.name).toBe('string');
    expect(copy._name).toBe('obj');
    expect(typeof copy._name).toBe('string');
    expect('ne' in copy).toBe(true);
    expect(copy.ne).toBe('non-enumerable');
    copy.ne = 'xxx';
    expect(copy.ne).toBe('xxx');
    expect('nc' in copy).toBe(true);
    expect(copy.nc).toBe('non-configurable');
    copy.nc = 'xxx';
    expect(copy.nc).toBe('xxx');
  });
});
