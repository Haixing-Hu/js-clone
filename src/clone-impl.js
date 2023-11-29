////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import typeInfo from '@haixing_hu/typeinfo';
import cloneArray from './clone-array';
import cloneBuffer from './clone-buffer';
import cloneCopyConstructableObject from './clone-copy-constructable-object';
import cloneDataView from './clone-data-view';
import cloneError from './clone-error';
import cloneMap from './clone-map';
import cloneObject from './clone-object';
import clonePrimitiveWrapperObject from './clone-primitive-wrapper-object';
import clonePromise from './clone-promise';
import cloneSet from './clone-set';
import cloneTypedArray from './clone-typed-array';

/**
 * The implementation of the `clone` function.
 *
 * @param {any} source
 *     The object to be cloned.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @return {any}
 *     The deep clone of the specified object.
 * @author Haixing Hu
 * @private
 */
function cloneImpl(source, options, cache) {
  const info = typeInfo(source);
  switch (info.type) {
    case 'undefined':               // drop down
    case 'null':                    // drop down
    case 'boolean':                 // drop down
    case 'number':                  // drop down
    case 'string':                  // drop down
    case 'symbol':                  // drop down
    case 'bigint':                  // drop down
      return source;                // don't need to clone immutable primitives
    case 'function':
      return source;                // we do NOT clone functions, since it could cause too much troubles
    case 'object':                  // drop down
    default:
      break;
  }
  switch (info.subtype) {
    case 'Boolean':                 // drop down
    case 'Number':                  // drop down
    case 'String':
      return clonePrimitiveWrapperObject(source, options, cache);
    case 'Date':                    // drop down
    case 'RegExp':
      return cloneCopyConstructableObject(source, options, cache);
    case 'Map':
      return cloneMap(source, options, cache);
    case 'Set':
      return cloneSet(source, options, cache);
    case 'WeakMap':                 // drop down
    case 'WeakSet':
      return source;                // WeakMap and WeakSet cannot be cloned :(
    case 'Array':
      return cloneArray(source, options, cache);
    case 'Int8Array':               // drop down
    case 'Uint8Array':              // drop down
    case 'Uint8ClampedArray':       // drop down
    case 'Int16Array':              // drop down
    case 'Uint16Array':             // drop down
    case 'Int32Array':              // drop down
    case 'Uint32Array':             // drop down
    case 'BigInt64Array':           // drop down
    case 'BigUint64Array':          // drop down
    case 'Float32Array':            // drop down
    case 'Float64Array':
      return cloneTypedArray(source, options, cache);
    case 'ArrayBuffer':             // drop down
    case 'SharedArrayBuffer':
      return cloneBuffer(source, options, cache);
    case 'DataView':
      return cloneDataView(source, options, cache);
    case 'WeakRef':
      return source;                // WeakRef cannot be cloned :(
    case 'Promise':
      return clonePromise(source, options, cache);
    case 'Intl.Collator':
    case 'Intl.DateTimeFormat':
    case 'Intl.DisplayNames':
    case 'Intl.DurationFormat':
    case 'Intl.ListFormat':
    case 'Intl.Locale':
    case 'Intl.NumberFormat':
    case 'Intl.PluralRules':
    case 'Intl.RelativeTimeFormat':
    case 'Intl.Segmenter':
      return source;                // Intl objects are immutable and cannot be cloned
    case 'MapIterator':
    case 'SetIterator':
    case 'ArrayIterator':
    case 'StringIterator':
    case 'RegExpStringIterator':
    case 'SegmenterStringIterator':
      return source;                // iterators cannot be cloned :(
    case 'Error':
      return cloneError(source, options, cache);
    case 'Arguments':               // arguments is a special array like object
      return source;                // arguments cannot be cloned :(
    case 'Generator':
    case 'AsyncGenerator':
      return source;                // generators cannot be cloned :(
    case 'GlobalObject':
      return source;                // global object cannot be cloned :(
    case 'Object':                  // drop down
    default:
      // clone all other objects, including user defined objects
      return cloneObject(source, options, cache);
  }
}

export default cloneImpl;
