////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { DOM_NODE_EXISTS } from '@haixing_hu/type-detect';
import clone from '../src';

describe('clone DOM objects', () => {
  if (DOM_NODE_EXISTS) {
    test('clone DOM objects', () => {
      const div = document.createElement('div');
      div.innerHTML = 'Hello, world!';
      const cloned = clone(div);
      expect(cloned).toBe(div);
    });
    test('clone object contain DOM object', () => {
      const div = document.createElement('div');
      div.innerHTML = 'Hello, world!';
      const obj = {
        name: 'hello',
        element: div,
      };
      const cloned = clone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.name).toBe(obj.name);
      expect(cloned.element).toBe(obj.element);
    });
  }
});
