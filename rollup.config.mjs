////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import rollupBuilder from '@haixing_hu/rollup-builder';
import { fileURLToPath } from 'node:url';

export default rollupBuilder('clone', import.meta.url, {
  useCommonjsPlugin: false,
  babelPluginOptions: {
    configFile: fileURLToPath(new URL('babel.config.js', import.meta.url)),
    babelHelpers: 'bundled',
  },
});
