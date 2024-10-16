////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
/* eslint-disable import/no-cycle */
import cloneArray from './clone-array';
import cloneBuffer from './clone-buffer';
import cloneCopyConstructableObject from './clone-copy-constructable-object';
import cloneDataView from './clone-data-view';
import cloneError from './clone-error';
import cloneMap from './clone-map';
import cloneCustomizedObject from './clone-customized-object';
import clonePrimitiveWrapperObject from './clone-primitive-wrapper-object';
import clonePromise from './clone-promise';
import cloneSet from './clone-set';
import cloneTypedArray from './clone-typed-array';

/**
 * The implementation of the `clone` function to clone a general object.
 *
 * @param {Object} info
 *     The type information about the object to be cloned.
 * @param {any} source
 *     The object to be cloned.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @return {any}
 *     The deep clone of the specified object.
 * @private
 * @author Haixing Hu
 */
function cloneObjectImpl(info, source, options, cache) {
  switch (info.category) {
    case 'string':
    case 'boolean':
    case 'numeric':
      return clonePrimitiveWrapperObject(source, options, cache);
    case 'date':                    // drop down
    case 'regexp':
      return cloneCopyConstructableObject(source, options, cache);
    case 'map':
      return cloneMap(source, options, cache);
    case 'set':
      return cloneSet(source, options, cache);
    case 'array':
      return cloneArray(source, options, cache);
    case 'typed-array':
      return cloneTypedArray(source, options, cache);
    case 'buffer':
      return cloneBuffer(source, options, cache);
    case 'data-view':
      return cloneDataView(source, options, cache);
    case 'promise':
      return clonePromise(source, options, cache);
    case 'error':
      return cloneError(source, options, cache);
    case 'weak':                    // weak referenced cannot be cloned :(
    case 'intl':                    // Intl objects are immutable and cannot be cloned
    case 'iterator':                // iterators cannot be cloned :(
    case 'finalization-registry':   // FinalizationRegistry cannot be cloned :(
    case 'arguments':               // arguments cannot be cloned :(
    case 'generator':               // generators cannot be cloned :(
    case 'global':                  // global object cannot be cloned :(
    case 'DOM':                     // DOM object cannot be cloned :(
    case 'CSSOM':                   // CSSOM object cannot be cloned :(
    case 'event':                   // Event object cannot be cloned :(
    case 'console':                 // window.console cannot be cloned :(
    case 'file':                    // File API object cannot be cloned :(
      return source;
    case 'object':                  // drop down
    case 'class':                   // drop down
    default:
      // clone all other objects, including user defined objects
      return cloneCustomizedObject(source, options, cache);
  }
}

export default cloneObjectImpl;
