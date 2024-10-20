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

  test('customized class, with toJSON() method defined with clone()', () => {
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

      toJSON() {
        const cloneOptions = {
          includeAccessor: false,
          includeNonEnumerable: false,
          includeReadonly: true,
          includeNonConfigurable: true,
          convertNaming: false,
          pojo: true,
          disableHooks: true,
          useToJSON: true,
          skipRootToJSON: true,
        };
        return clone(this, cloneOptions);
      }
    }
    const original = new Customized('hello');
    const cloned = clone(original, { useToJSON: true });
    expect(cloned).toBeInstanceOf(Object);
    expect(cloned).toEqual({
      value: 'hello',
      gender: 'MALE',
    });
  });

  test('customized class, with toJSON() method defined with clone(), should call toJSON with options', () => {
    const cloneOptions = {
      includeAccessor: false,
      includeNonEnumerable: false,
      includeReadonly: true,
      includeNonConfigurable: true,
      pojo: true,
      disableHooks: true,
      useToJSON: true,
      skipRootToJSON: true,
    };
    class Child {
      firstChildField = 'first-child-field';

      secondChildField = 'second-child-field';

      toJSON(key, options) {
        return clone(this, {
          ...cloneOptions,
          ...options,
        });
      }
    }
    class Parent {
      firstField = 'first-field';

      secondField = new Child();

      toJSON(key, options) {
        return clone(this, {
          ...cloneOptions,
          ...options,
        });
      }
    }
    const original = new Parent();
    const cloned = clone(original, {
      pojo: true,
      useToJSON: true,
      skipRootToJSON: true,
      convertNaming: true,
      sourceNamingStyle: 'LOWER_CAMEL',
      targetNamingStyle: 'LOWER_UNDERSCORE',
    });
    expect(cloned).toBeInstanceOf(Object);
    expect(cloned).toEqual({
      first_field: 'first-field',
      second_field: {
        first_child_field: 'first-child-field',
        second_child_field: 'second-child-field',
      },
    });
  });
});
