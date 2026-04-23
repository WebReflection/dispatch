import throwing from './index.js';
import yolo from './yolo.js';

test(throwing);
test(yolo);

function test(dispatch) {
  const shouldThrow = dispatch !== yolo;
  const et = new EventTarget;

  et.addEventListener(
    'test',
    event => {
      console.assert(!(event instanceof CustomEvent), 'event is not a CustomEvent');
      console.assert(event.target === et, 'event.target is the event target');
      console.assert(event.type === 'test', 'event.type is the event type');
      console.assert(event.bubbles === false, 'event.bubbles is false');
      console.assert(event.cancelable === false, 'event.cancelable is false');
      console.assert(event.composed === false, 'event.composed is false');
      console.assert(event.detail === undefined, 'event.detail is undefined');
      console.assert(event.currentTarget === et, 'event.currentTarget is the event target');
    },
    { once: true }
  );

  dispatch.call(et, 'test');

  et.addEventListener(
    'test',
    event => {
      console.assert(event instanceof CustomEvent, 'event is a CustomEvent');
      console.assert(event.target === et, 'event.target is the event target');
      console.assert(event.type === 'test', 'event.type is the event type');
      console.assert(event.bubbles === false, 'event.bubbles is false');
      console.assert(event.cancelable === false, 'event.cancelable is false');
      console.assert(event.composed === false, 'event.composed is false');
      console.assert(event.detail === 123, 'event.detail is 123');
      console.assert(event.currentTarget === et, 'event.currentTarget is the event target');
    },
    { once: true }
  );

  dispatch.call(et, 'test', { detail: 123 });

  et.addEventListener(
    'test',
    event => {
      console.assert(!(event instanceof CustomEvent), 'event is not a CustomEvent');
      console.assert(event.target === et, 'event.target is the event target');
      console.assert(event.type === 'test', 'event.type is the event type');
      console.assert(event.bubbles === false, 'event.bubbles is false');
      console.assert(event.cancelable === false, 'event.cancelable is false');
      console.assert(event.composed === false, 'event.composed is false');
      console.assert(event.detail === undefined, 'event.detail is 123');
      console.assert(event.currentTarget === et, 'event.currentTarget is the event target');
    },
    { once: true }
  );

  dispatch.call(et, 'test', null);

  const gt = globalThis;

  globalThis.globalThis = et;
  et.addEventListener(
    'test',
    event => {
      console.assert(event.target === globalThis, 'this is globalThis');
    },
    { once: true }
  );
  dispatch('test');

  gt.globalThis = gt;

  if (shouldThrow) {
    try {
      dispatch();
      throw new Error('Expected error');
    }
    catch (error) {
      console.assert(error instanceof TypeError, 'error is a TypeError');
      console.assert(error.message === 'Invalid dispatch arguments', 'error.message is Invalid dispatch arguments');
    }

    try {
      dispatch({ nonExistent: true });
      throw new Error('Expected error');
    }
    catch (error) {
      console.assert(error instanceof TypeError, 'error is a TypeError');
      console.assert(error.message === 'Invalid dispatch type', 'error.message is Invalid dispatch type');
    }

    try {
      dispatch(null, 'test', { nonExistent: true });
      throw new Error('Expected error');
    }
    catch (error) {
      console.assert(error instanceof TypeError, 'error is a TypeError');
      console.assert(error.message === 'Invalid dispatch target', 'error.message is Invalid dispatch target');
    }
  }

  et.addEventListener(
    'test',
    event => {
      console.assert(!(event instanceof CustomEvent), 'event is not a CustomEvent');
      console.assert(event.target === et, 'event.target is the event target');
      console.assert(event.type === 'test', 'event.type is the event type');
      console.assert(event.bubbles === false, 'event.bubbles is false');
      console.assert(event.cancelable === false, 'event.cancelable is false');
      console.assert(event.composed === false, 'event.composed is false');
      console.assert(event.detail === undefined, 'event.detail is undefined');
      console.assert(event.currentTarget === et, 'event.currentTarget is the event target');
    },
    { once: true }
  );

  dispatch(et, 'test');

  et.addEventListener(
    'test',
    event => {
      console.assert(event instanceof CustomEvent, 'event is a CustomEvent');
      console.assert(event.target === et, 'event.target is the event target');
      console.assert(event.type === 'test', 'event.type is the event type');
      console.assert(event.bubbles === false, 'event.bubbles is false');
      console.assert(event.cancelable === false, 'event.cancelable is false');
      console.assert(event.composed === false, 'event.composed is false');
      console.assert(event.detail === 123, 'event.detail is 123');
      console.assert(event.currentTarget === et, 'event.currentTarget is the event target');
    },
    { once: true }
  );

  dispatch(et, 'test', { detail: 123 });
  dispatch(et, 'test', { bubbles: false });
}
