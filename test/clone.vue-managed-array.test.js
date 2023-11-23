////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';

import clone from '../src';

/**
 * Unit test the `clone()` function to clone Vue.js managed reactive array.
 *
 * @author Haixing Hu
 */
describe('clone a Vue managed array', () => {
  test('clone normal array', () => {
    const array = [1, 2, 3];
    const result = clone(array);
    console.log('result = ', result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeArray();
    expect(result.length).toBe(3);
    expect(result).toEqual([1, 2, 3]);
  });
  const Wrapper = defineComponent({
    data() {
      return {
        array: [1, 2, 3],
      };
    },
    template: '<div>length = {{array.length}}</div>',
  });
  test('clone a Vue managed array', () => {
    const wrapper = mount(Wrapper);
    expect(wrapper.vm.array).toBeDefined();
    expect(wrapper.vm.array).not.toBeNull();
    expect(wrapper.vm.array).toBeArray();
    expect(wrapper.vm.array.length).toBe(3);
    console.log('wrapper.vm.array = ', wrapper.vm.array);
    const result = clone(wrapper.vm.array);
    console.log('result = ', result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeArray();
    expect(result.length).toBe(3);
    expect(result).toEqual([1, 2, 3]);
  });
});
