////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';

describe('clone CSSOM objects', () => {
  test('clone CSSOM objects', () => {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    const styleSheet = document.styleSheets[0];
    const cloned = clone(styleSheet);
    expect(cloned).toBe(styleSheet);
  });
  test('clone object contain CSSOM object', () => {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    const styleSheet = document.styleSheets[0];
    const obj = {
      name: 'hello',
      sheet: styleSheet,
    };
    const cloned = clone(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.name).toBe(obj.name);
    expect(cloned.sheet).toBe(obj.sheet);
  });
});
