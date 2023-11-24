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
 * Unit test the `clone()` function to clone promises.
 *
 * @author Haixing Hu
 */
describe('clone promises', () => {
  it('should clone a basic promise', async () => {
    const original = Promise.resolve(42);
    const cloned = clone(original);
    expect(await cloned).toBe(42);
  });
  it('should handle circular references', async () => {
    const original = Promise.resolve(42);
    original.self = original;
    const cloned = clone(original);
    expect(cloned.self).toBe(cloned);
    expect(await cloned).toBe(42);
  });
  it('should clone a complex promise chain', async () => {
    const original = Promise.resolve(10).then(value => value * 2);
    const cloned = clone(original);
    expect(await cloned).toBe(20);
  });
  it('should handle promise rejection', async () => {
    const original = Promise.reject(new Error('Test Error'));
    const cloned = clone(original);
    await expect(cloned).rejects.toThrow('Test Error');
  });
});
