////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  BLOB_EXISTS,
  FILE_EXISTS,
  FILE_LIST_EXISTS,
  FILE_READER_EXISTS,
} from '@qubit-ltd/type-detect';
import clone from '../src';

describe('clone File API objects', () => {
  if (FILE_EXISTS) {
    test('clone File objects', () => {
      const file = new File([''], 'filename');
      const cloned = clone(file);
      expect(cloned).toBe(file);
    });
    test('clone object contain File object', () => {
      const file = new File([''], 'filename');
      const obj = {
        name: 'hello',
        content: file,
      };
      const cloned = clone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.name).toBe(obj.name);
      expect(cloned.content).toBe(obj.content);
    });
  }
  if (BLOB_EXISTS) {
    test('clone Blob objects', () => {
      const blob = new Blob([''], { type: 'text/plain' });
      const cloned = clone(blob);
      expect(cloned).toBe(blob);
    });
    test('clone object contain Blob object', () => {
      const blob = new Blob([''], { type: 'text/plain' });
      const obj = {
        name: 'hello',
        content: blob,
      };
      const cloned = clone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.name).toBe(obj.name);
      expect(cloned.content).toBe(obj.content);
    });
  }
  if (FILE_LIST_EXISTS) {
    test('clone FileList objects', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      document.body.appendChild(fileInput);
      const list = fileInput.files;
      const cloned = clone(list);
      expect(cloned).toBe(list);
    });
    test('clone object contain FileList object', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      document.body.appendChild(fileInput);
      const list = fileInput.files;
      const obj = {
        name: 'hello',
        content: list,
      };
      const cloned = clone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.name).toBe(obj.name);
      expect(cloned.content).toBe(obj.content);
    });
  }
  if (FILE_READER_EXISTS) {
    test('clone FileReader objects', () => {
      const reader = new FileReader();
      const cloned = clone(reader);
      expect(cloned).toBe(reader);
    });
    test('clone object contain FileReader object', () => {
      const reader = new FileReader();
      const obj = {
        name: 'hello',
        content: reader,
      };
      const cloned = clone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.name).toBe(obj.name);
      expect(cloned.content).toBe(obj.content);
    });
  }
});
