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
 * Unit test the `clone()` function to clone iterators.
 *
 * @author Haixing Hu
 */
describe('clone Intl objects', () => {
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
  test('StringIterator', () => {
    const str = 'Hello world';
    const iterator = str[Symbol.iterator]();
    expect(clone(iterator)).toBe(iterator);
  });
  test('RegExpStringIterator', () => {
    const regexp =  /^[a-z]+/;
    const iterator = regexp[Symbol.iterator]();
    expect(clone(iterator)).toBe(iterator);
  });
  test('SegmenterStringIterator', () => {
    const string1 = 'Que ma joie demeure';
    const segmenterFrGrapheme = new Intl.Segmenter('fr', {
      granularity: 'grapheme',
    });
    const graphemeSegments = segmenterFrGrapheme.segment(string1);
    const iterator = graphemeSegments[Symbol.iterator]();
    expect(clone(iterator)).toBe(iterator);
  });
});
