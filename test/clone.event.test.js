////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';

describe('clone Event objects', () => {
  if (window && window.console) {
    test('clone Event objects', () => {
      const e = new Event('click');
      const cloned = clone(e);
      expect(cloned).toBe(e);
    });
    test('clone object contain Event object', () => {
      const e = new Event('click');
      const obj = {
        name: 'hello',
        content: e,
      };
      const cloned = clone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.name).toBe(obj.name);
      expect(cloned.content).toBe(obj.content);
    });
  }
});
