////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import testError from './utils/test-error';

/**
 * Unit test the `clone()` function to clone instances of the `Error` or its
 * subclasses.
 *
 * @author Haixing Hu
 */
describe('clone(Error)', () => {
  describe('errors', () => {
    class MyError extends RangeError {
      code = '';
      constructor(message, filename, lineNumber, code) {
        super(message, filename, lineNumber);
        this.code = code;
      }
    }
    testError(new Error('message', 'filename', 50));
    testError(new EvalError('message', 'filename', 50));
    testError(new RangeError('message', 'filename', 50));
    testError(new ReferenceError('message', 'filename', 50));
    testError(new SyntaxError('message', 'filename', 50));
    testError(new TypeError('message', 'filename', 50));
    testError(new URIError('message', 'filename', 50));
    testError(new MyError('message', 'filename', 50, '001'));

    const e0 = new EvalError('message', 'filename', 50);
    const e1 = new SyntaxError('message', 'filename', 50);
    const e2 = new TypeError('message', 'filename', 50);
    const e3 = new MyError('message', 'filename', 50, '001');
    e1.cause = e0;
    e2.cause = e1;
    e3.cause = e2;
    testError(e3);
  });
});
