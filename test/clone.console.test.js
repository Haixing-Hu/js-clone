////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';

describe('clone window.console objects', () => {
  if (window && window.console) {
    test('clone window.console objects', () => {
      const c = window.console;
      const cloned = clone(c);
      expect(cloned).toBe(c);
    });
    test('clone object contain window.console object', () => {
      const obj = {
        name: 'hello',
        element: window.console,
      };
      const cloned = clone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.name).toBe(obj.name);
      expect(cloned.element).toBe(obj.element);
    });
  }
});
