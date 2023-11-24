////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  INTL_COLLATOR_EXISTS,
  INTL_DATETIMEFORMAT_EXISTS,
  INTL_DISPLAYNAMES_EXISTS,
  INTL_DURATIONFORMAT_EXISTS,
  INTL_LISTFORMAT_EXISTS,
  INTL_LOCALE_EXISTS,
  INTL_NUMBERFORMAT_EXISTS,
  INTL_PLURALRULES_EXISTS,
  INTL_RELATIVETIMEFORMAT_EXISTS,
  INTL_SEGMENTER_EXISTS,
} from '@haixing_hu/typeinfo';
import clone from '../src';

/**
 * Unit test the `clone()` function to clone Intl objects.
 *
 * @author Haixing Hu
 */
describe('clone Intl objects', () => {
  if (INTL_COLLATOR_EXISTS) {
    test('Intl.Collator', () => {
      const obj = new Intl.Collator('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_DATETIMEFORMAT_EXISTS) {
    test('Intl.DateTimeFormat', () => {
      const obj = new Intl.DateTimeFormat('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_DISPLAYNAMES_EXISTS) {
    test('Intl.DisplayNames', () => {
      const obj = new Intl.DisplayNames('zh', { type: 'region' });
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_DURATIONFORMAT_EXISTS) {
    test('Intl.DurationFormat', () => {
      const obj = new Intl.DurationFormat('zh', { style: 'long' });
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_LISTFORMAT_EXISTS) {
    test('Intl.ListFormat', () => {
      const obj = new Intl.ListFormat('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_LOCALE_EXISTS) {
    test('Intl.Locale', () => {
      const obj = new Intl.Locale('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_NUMBERFORMAT_EXISTS) {
    test('Intl.NumberFormat', () => {
      const obj = new Intl.NumberFormat('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_PLURALRULES_EXISTS) {
    test('Intl.PluralRules', () => {
      const obj = new Intl.PluralRules('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_RELATIVETIMEFORMAT_EXISTS) {
    test('Intl.RelativeTimeFormat', () => {
      const obj = new Intl.RelativeTimeFormat('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
  if (INTL_SEGMENTER_EXISTS) {
    test('Intl.Segmenter', () => {
      const obj = new Intl.Segmenter('zh');
      expect(clone(obj)).toBe(obj);
    });
  }
});
