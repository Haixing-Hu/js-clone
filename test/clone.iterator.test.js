////////////////////////////////////////////////////////////////////////////////
import {
  ARRAY_ITERATOR_EXISTS,
  INT8ARRAY_EXISTS,
  INTL_SEGMENTER_ITERATOR_EXISTS,
  MAP_ITERATOR_EXISTS,
  REGEXP_ITERATOR_EXISTS,
  SET_ITERATOR_EXISTS,
  STRING_ITERATOR_EXISTS,
} from '@qubit-ltd/type-detect';
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '../src';

/**
 * Unit test the `clone()` function to clone iterators.
 *
 * @author Haixing Hu
 */
describe('clone iterators', () => {
  if (MAP_ITERATOR_EXISTS) {
    test('MapIterator', () => {
      const map = new Map();
      const entries = map.entries();
      expect(clone(entries)).toBe(entries);
      const keys = map.keys();
      expect(clone(keys)).toBe(keys);
      const values = map.values();
      expect(clone(values)).toBe(values);
      const iterator = map[Symbol.iterator]();
      expect(clone(iterator)).toBe(iterator);
    });
  }
  if (SET_ITERATOR_EXISTS) {
    test('SetIterator', () => {
      const set = new Set();
      const entries = set.entries();
      expect(clone(entries)).toBe(entries);
      const keys = set.keys();
      expect(clone(keys)).toBe(keys);
      const values = set.values();
      expect(clone(values)).toBe(values);
      const iterator = set[Symbol.iterator]();
      expect(clone(iterator)).toBe(iterator);
    });
  }
  if (ARRAY_ITERATOR_EXISTS) {
    test('ArrayIterator', () => {
      const array = [1, 2, 3];
      const entries = array.entries();
      expect(clone(entries)).toBe(entries);
      const keys = array.keys();
      expect(clone(keys)).toBe(keys);
      const values = array.values();
      expect(clone(values)).toBe(values);
      const iterator = array[Symbol.iterator]();
      expect(clone(iterator)).toBe(iterator);
    });
    if (INT8ARRAY_EXISTS) {
      test('TypedArrayIterator', () => {
        const array = new Int8Array(2);
        const entries = array.entries();
        expect(clone(entries)).toBe(entries);
        const keys = array.keys();
        expect(clone(keys)).toBe(keys);
        const values = array.values();
        expect(clone(values)).toBe(values);
        const iterator = array[Symbol.iterator]();
        expect(clone(iterator)).toBe(iterator);
      });
    }
  }
  if (STRING_ITERATOR_EXISTS) {
    test('StringIterator', () => {
      const str = 'Hello world';
      const iterator = str[Symbol.iterator]();
      expect(clone(iterator)).toBe(iterator);
    });
  }
  if (REGEXP_ITERATOR_EXISTS) {
    test('RegExpStringIterator', () => {
      const regexp = /^[a-z]+/;
      const iterator = regexp[Symbol.matchAll]();
      expect(clone(iterator)).toBe(iterator);
    });
  }
  if (INTL_SEGMENTER_ITERATOR_EXISTS) {
    test('SegmenterStringIterator', () => {
      const string1 = 'Que ma joie demeure';
      const segmenterFrGrapheme = new Intl.Segmenter('fr', {
        granularity: 'grapheme',
      });
      const graphemeSegments = segmenterFrGrapheme.segment(string1);
      const iterator = graphemeSegments[Symbol.iterator]();
      expect(clone(iterator)).toBe(iterator);
    });
  }
});
