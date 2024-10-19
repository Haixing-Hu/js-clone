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
 * Unit test the `clone()` function to clone built-in `Set`.
 *
 * @author Haixing Hu
 */
describe('clone with `useToJSON` option', () => {
  test('customized class, with toJSON() in root object', () => {
    class Customized {
      constructor(value) {
        this.value = value;
      }

      toJSON() {
        return { name: 'Customized', value: this.value };
      }
    }
    const original = new Customized('hello');
    const cloned = clone(original, { useToJSON: true });
    expect(cloned).toBeInstanceOf(Object);
    expect(cloned).not.toBeInstanceOf(Customized);
    expect(cloned).toEqual({
      name: 'Customized',
      value: 'hello',
    });
  });

  test('plain old object, with toJSON() in root object', () => {
    const original = {
      toJSON() {
        return { name: 'PlainOldObject' };
      },
    };
    const cloned = clone(original, { useToJSON: true });
    expect(cloned).toBeInstanceOf(Object);
    expect(cloned).toEqual({ name: 'PlainOldObject' });
  });

  test('customized class, with toJSON() in nested object', () => {
    class Gender {
      constructor(value) {
        this.value = value;
      }

      toJSON() {
        return this.value;
      }
    }
    class Customized {
      constructor(value) {
        this.value = value;
        this.gender = new Gender('MALE');
      }
    }
    const original = new Customized({
      toJSON() {
        return { name: 'NestedObject' };
      },
    });
    const cloned = clone(original, { useToJSON: true });
    expect(cloned).toBeInstanceOf(Customized);
    expect(cloned).toEqual({
      value: { name: 'NestedObject' },
      gender: 'MALE',
    });
  });

  test('plain old class, with toJSON() in nested object', () => {
    class Foo {
      data = 0;

      msg = 'hello';

      toJSON(key) {
        return { [key]: 'PlainOldClass' };
      }
    }
    class Gender {
      constructor(value) {
        this.value = value;
      }

      toJSON() {
        return this.value;
      }
    }
    const original = {
      value: new Foo(),
      gender: new Gender('MALE'),
    };
    const cloned = clone(original, { useToJSON: true });
    expect(cloned).toBeInstanceOf(Object);
    expect(cloned).toEqual({
      value: { value: 'PlainOldClass' },
      gender: 'MALE',
    });
  });
});
